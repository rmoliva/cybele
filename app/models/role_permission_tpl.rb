module RolePermissionTpl
  extend ::ActiveSupport::Concern

    included do
      acts_as_api
      api_accessible :base do |template|
        template.add :id
        template.add :role_id
        template.add :app
        template.add :klass
        template.add :action
        template.add :value
      end
    end

    module ClassMethods
    end
end
