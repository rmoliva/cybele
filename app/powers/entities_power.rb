
# Control de acceso al controlador de entidades
class EntitiesPower
  include ActsAsPowerScope
  
  acts_as_power_scope do |config|
    config.class_name = 'entity'
  end
  
  def initialize(context)
    @context = context
  end

  def default_scope
    case(@context.app)
    when "central" then Entity
    when "entity" then @context.entity.children
    end
  end
end
