module UserSessionTpl
  extend ::ActiveSupport::Concern

  included do
    extend ::ActsAsApi::Base
    acts_as_api
    api_accessible :base do |template|
      template.add :user, :template => :base
    end
  end

  module ClassMethods
  end
end