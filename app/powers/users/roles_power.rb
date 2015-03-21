module Users
  # Control de acceso al controlador de usuarios
  class RolesPower
    include ActsAsPowerScope
    
    acts_as_power_scope do |config|
      config.class_name = 'role_user'
    end
    
    def initialize(context, user_id)
      @context = context
      @main = User.find(user_id)
    end
  
    def default_scope
      case(@context.app)
        when "central" then @main.role_users
        when "network" then @main.role_users.with_network(@context.entity_id)
        when "organization" then @main.role_users.with_organization(@context.entity_id)
      end
    end
  end
end
