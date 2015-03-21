
# Control de acceso al controlador de usuarios
class UsersPower
  include ActsAsPowerScope
  
  acts_as_power_scope do |config|
    config.class_name = 'user'
  end
  
  def initialize(context)
    @context = context
  end

  def default_scope
    case(@context.app)
    when "central" then User
    when "network" then @context.entity.users
    when "organization" then @context.entity.users
    end
  end
end
