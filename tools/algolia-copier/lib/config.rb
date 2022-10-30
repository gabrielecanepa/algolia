require "yaml"

CONFIG = YAML.load_file("config.yml").transform_keys(&:to_sym).freeze
