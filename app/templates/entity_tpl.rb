module EntityTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
      end
    end

    module ClassMethods
    end
end