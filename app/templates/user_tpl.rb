module UserTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
        template.add :name
        template.add :surname
        template.add :email
      
        template.add :gender
        template.add :active
      
        template.add :address
        template.add :city
        template.add :state
        template.add :postal_code
        template.add :phone1
        template.add :phone2
        template.add :email2
      end
      
      api_accessible :list do |template|
        template.add :id
        template.add :name
        template.add :surname
        template.add :email
      end

      api_accessible :with_roles, :extend => :base do |template|
        template.add :roles, :template => :base
      end
    end

    module ClassMethods
    end
end