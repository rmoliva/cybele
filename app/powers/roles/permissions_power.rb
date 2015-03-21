module Roles
  # Control de acceso al controlador de roles
  class PermissionsPower
    include ActsAsPowerScope
    
    acts_as_power_scope do |config|
      config.class_name = 'role_permission'
    end
    
    def initialize(context, parent_id)
      @context = context
      @main = Role.find(parent_id)
    end
  
    def default_scope
      @main.role_permissions
    end
  end
end