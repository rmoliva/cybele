
# Control de acceso al controlador de containers
class ContainersPower
  include ActsAsPowerScope
  
  acts_as_power_scope do |config|
    config.class_name = 'container'
  end
  
  def initialize(context, container_name)
    @context = context
    @container_name = container_name
  end

  def default_scope
    # Buscar los contenedores de la entidad especifica
    # con el nombre buscado
    @context.entity.containers.with_name(@container_name)
  end
end
