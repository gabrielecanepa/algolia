require "yaml"

CONFIG = YAML.load_file("#{__dir__}/../config.yml").transform_keys(&:to_sym).freeze
