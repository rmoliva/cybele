module OrganizationTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
        template.add :name
        template.add :description
        template.add :email
      
        
        template.add :address
        template.add :city
        template.add :state
        template.add :postal_code
        template.add :phone1
        template.add :phone2
        template.add :email2
      end
    end

    module ClassMethods
    end
end
