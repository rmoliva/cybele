class Permission 
  
  class << self
    def self.scopes
      ApplicationContext.apps
    end
    
    def central # app 
      {
        user: [ # klass
          :index, # action
          :create,
          :update,
          :destroy
        ],
        role: [ # permission
          :index, # action
          :create,
          :update,
          :destroy
        ],
        role_permission: [ # permission
          :index, # action
          :create,
          :update,
          :destroy
        ],
        permission: [ # permission
          :show # action
        ],
        role_user: [
          :index, # action
          :create,
          :update,
          :destroy
        ],
        entity: [
          :index, # action
          :create,
          :update,
          :destroy
        ]
      }
    end

    def entity # app 
      {
        entity_user: [ # klass
          :index, # action
          :create,
          :update,
          :destroy
        ],
        role_user: [
          :index, # action
          :create,
          :update,
          :destroy
        ],
        entity: [
          :index, # action
          :create,
          :update,
          :destroy
        ]
      }
    end
  end
  
  def initialize user
    @user = user
    @permission_table = []

    # Cogemos todos los permisos de los roles del usuario
    user_roles = @user.role_users.includes(:role => :role_permissions)
    
    user_roles.each do |user_role|
      user_role.role.role_permissions.each do |permission|
        @permission_table << {
          :app => permission.app,
          :klass => permission.klass,
          :action => permission.action,
          :role_entity_type => user_role.entity_type,
          :role_entity_id => user_role.entity_id,
          :value => permission.value
        }
      end
    end
  end
  
  # Funcion que comprueba si un usuario tiene permiso para
  # una entidad en concreto (nil si es la central)
  # una clase (klass) y una accion en concreto
  def can?(app,entity,klass,action)
    # A nivel central, no hay mas que buscar
    if app == 'central'
      permission = find_permission(entity_type_by_app(app), entity, app, klass, action)
      return permission.try(:'[]', :value)
    end 
    
    # Obtener todos los ancestors de la entidad
    entity.self_and_parents.each do |ancestor|
      permission = find_permission(entity_type_by_app("entity"), ancestor, app, klass, action)
      return permission.try(:'[]', :value) if permission
    end

    # Hay que buscar a nivel central si es un permiso a nivel de red
    permission = find_permission(entity_type_by_app("central"), nil, app, klass, action)
    value = permission.try(:"[]",:value)

    # Si se llega aqui no se ha encontrado el permiso buscado
    Rails.logger.debug "No permisson to: #{app}, #{entity.id}, #{klass}, #{action}"
    value
  end # can?
  
protected
  def entity_type_by_app(app)
    case(app)
    when "central" then nil
    when "entity" then Entity
    else
      raise "Unkown application: #{app}"
    end
  end

  def find_permission(role_entity_type, role_entity, app, klass, action)
    # Poder pasar un id o un objeto como entidad
    entity_id = app == 'central' ? nil : role_entity.try(:id) # Para la entidad central, no buscar por id

    # Buscamos primero si hay una busqueda exacta
    permission = @permission_table.detect do |pt|
      pt[:app] == app.to_s and 
      pt[:klass] == klass.to_s and 
      pt[:action].to_s == action.to_s and
      pt[:role_entity_type].to_s == role_entity_type.to_s and 
      pt[:role_entity_id] == entity_id 
    end
    permission
  end  
end
