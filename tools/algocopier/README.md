# Algocopier

Algocopier is a tool to copy indices (data and settings) from one index to another.

## Usage

1. If not already installed, install Ruby 3.1.0 with your preferred version manager:

```sh
rbenv install 3.1.0
# or
rvm install 3.1.0
```

2. Install the Ruby dependencies with Bundler:

```sh
gem install bundler
bundle install
```

3. Copy `config.example.yml` to `config.yml` and fill in the configuration values. The applications must follow the specified format.

4. Make the script executable:

```sh
chmod +x ./bin/algocopier
```

5. Run the script:

```sh
# If ./.bin is in your $PATH
algocopier
# Otherwise
sh ./bin/algocopier
```
