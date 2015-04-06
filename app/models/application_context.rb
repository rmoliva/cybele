# Esta clase guarda información del contexto de aplicación.
# El contexto de aplicacion tiene los siguientes parametros:
# - app : Nombre de la aplicacion que se está ejecutando
# - entity_id : Id de la entidad sobre la que se esta trabajando (Id de la red, etc)
# - user : Usuario que ha accedido a la aplicacion

# El contexto de aplicación tiene como fin definir como se comportan los
# datos de acceso para definir como se comportan los scopes en base a los 
# permisos del usuario sobre la aplicacion en la que está trabajando

# Se crea un ApplicationContext por cada request que se hace y
# lo hace el controlador principal

class ApplicationContext
  include Virtus.model

  APPS = %w(central entity)
  
  attribute :app, String, :writer => :private
  attribute :entity_id, Integer, :writer => :private
  attribute :user, User, :writer => :private
  
  class << self
    def apps
      APPS
    end
  end
  

  def initialize options
    raise I18n.t('param.no_app') if options[:app].blank?
    @app = options[:app]
    @entity_id = options[:entity_id]
    @user = options[:user]
    @permission = Permission.new(self.user)
  end
  
  def can?(klass,action)
    @permission.can?(@app,entity,klass,action)
  end
  
  def entity
    case app
    when "central" then nil
    when "entity" then Entity.find(@entity_id)
    end
  end
  
end