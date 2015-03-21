
# Control de acceso al controlador de usuarios
class RolesPower
  include ActsAsPowerScope
  
  acts_as_power_scope do |config|
    config.class_name = 'role'
  end
  
  def initialize(context, filter_app)
    @context = context
    @filter_app = filter_app
  end

  def default_scope
    scope = Role
    scope = scope.with_app(@filter_app) if @filter_app
    scope
  end
end
