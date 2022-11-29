require "whirly"

DEFAULT_CONFIG = {
  spinner: "star",
  stop: Paint["✓", :green],
}.freeze

def progress(status, **opts)
  Whirly.start(status: "#{status}...", **DEFAULT_CONFIG.merge(opts)) do
    yield
    Whirly.status = status
  end
end
