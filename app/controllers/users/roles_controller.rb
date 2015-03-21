module Users
  class RolesController < ApplicationController
    include ActsAsAuthlogicController
    include ActsAsConsulController
    include ActsAsActionDispatcherController
    
    acts_as_consul_controller do |config|
      config.power_options = {:crud => :role_users}
    end
  
    acts_as_action_dispatcher_controller
    
    # Esta funcion devuelve el power de consul que utilizara este 
    # controlador
    def controller_power
      Users::RolesPower.new(application_context, params[:user_id])
    end
    
    # Esta funcion devuelve el objeto servicio que se encargara de 
    # atender a las acciones del controlador
    def service_object
     Users::RolesActionDispatcher.new(consul_scope)
    end
  
    def allowed_params
      params.permit(:id, "_dc", :tpl, :page, :start, :limit, {sort: [:property, :direction]}, {record: [:user_id, :role_id, :entity_type, :entity_id]})
    end
  end
end    
