require "algolia"
require "paint"
require_relative "config"
require_relative "progress"

APPS = CONFIG[:apps].freeze

# Apps
source_app = APPS[CONFIG[:source_app]].transform_keys(&:to_sym)
source_client = Algolia::Search::Client.create(source_app[:appId], source_app[:apiKey])
source_index = source_client.init_index(CONFIG[:source_index])
target_app = APPS[CONFIG[:target_app]].transform_keys(&:to_sym).freeze
target_client = Algolia::Search::Client.create(target_app[:appId], target_app[:apiKey])
target_index = target_client.init_index(CONFIG[:target_index])

# Index
if target_index.exists?
  if CONFIG[:clear_index]
    progress("Clearing index #{CONFIG[:target_index]}") do
      target_index.delete
    end
  end
else
  puts "#{Paint['ℹ︎', CONFIG[:color]]}  The index #{CONFIG[:target_index]} doesn't exist and will be created"
end

# Hits
if CONFIG[:hits]
  progress("Copying hits") do
    hits = []
    source_index.browse_objects(CONFIG[:params] || {}) { |hit| hits.push(hit) }
    target_index.save_objects(hits)
  end
end

# Settings
if CONFIG[:settings]
  progress("Copying settings") do
    settings = source_index.get_settings
    settings = settings.except(:replicas) unless CONFIG[:replicas]
    target_index.set_settings(settings)
  end
end

# Synonyms
if CONFIG[:synonyms]
  progress("Copying synonyms") do
    synonyms = source_index.browse_synonyms
    target_index.save_synonyms(synonyms)
  end
end

# Rules
if CONFIG[:rules]
  progress("Copying rules") do
    rules = source_index.browse_rules
    target_index.save_rules(rules)
  rescue StandardError
    # Check single rules
    rules.each do |rule|
      target_index.save_rule(rule)
    rescue StandardError => e
      puts "#{Paint['⚠︎', :yellow]}  Can't save rule #{rule[:objectID]}: #{e.message}"
      next
    end
  end
end

# Write to file
if CONFIG[:hits] && CONFIG[:file]
  progress("Writing to file") do
    File.write(CONFIG[:file], hits.to_json)
  end
end

puts "👍 Done!"
