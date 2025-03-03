source "https://rubygems.org"

gem "rails", "~> 8.0.1"
gem "mysql2", "~> 0.5"
gem "puma", ">= 5.0"
gem 'actioncable'
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"
gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false
gem "rack-cors"

gem 'graphql'
gem 'sidekiq'
gem 'sidekiq-scheduler'

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
  gem 'graphiql-rails'
end
