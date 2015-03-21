module RoleTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
        template.add :app
        template.add :name
        template.add :description
      end
    end

    module ClassMethods
    end
end
