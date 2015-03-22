module CountryTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
        template.add :code
        template.add :locale
        template.add :name
        template.add :description
      end
    end

    module ClassMethods
    end
end