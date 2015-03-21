module Roles
  class PermissionsController < ApplicationController
    include ActsAsAuthlogicController
    include ActsAsConsulController
    include ActsAsActionDispatcherController
    
    acts_as_consul_controller do |config|
      config.power_options = {:crud => :role_permissions}
    end
  
    acts_as_action_dispatcher_controller
    
    # Esta funcion devuelve el power de consul que utilizara este 
    # controlador
    def controller_power
      raise I18n.t(:error_param_scope) if params[:role_id].blank?
      
      Roles::PermissionsPower.new(application_context, params[:role_id])
    end
    
    # Esta funcion devuelve el objeto servicio que se encargara de 
    # atender a las acciones del controlador
    def service_object
      Roles::PermissionsActionDispatcher.new(consul_scope)
    end
  
    def allowed_params
      params.permit(:id, "_dc", :tpl, :page, :start, :limit, :format, :scope, :role_id, {sort: [:property, :direction]}, {record: [:app,:role_id,:klass,:action,:value]})
    end
    
  end
end