module RoleUserTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
        template.add :role_id
        template.add :user_id
        template.add :entity_type
        template.add :entity_id
      end
      
      api_accessible :with_role, :extend => :base do |template|
        template.add :role, :template => :base
      end

      api_accessible :with_user, :extend => :base do |template|
        template.add :user, :template => :base
      end
    end

    module ClassMethods
    end
end