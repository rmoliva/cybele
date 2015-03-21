class RolesController < ApplicationController
  include ActsAsAuthlogicController
  include ActsAsConsulController
  include ActsAsActionDispatcherController
  
  acts_as_consul_controller do |config|
    config.power_options = {:crud => :roles}
  end

  acts_as_action_dispatcher_controller
  
  # Esta funcion devuelve el power de consul que utilizara este 
  # controlador
  def controller_power
    RolesPower.new(application_context, params[:filter].try(:'[]', :app))
  end
  
  # Esta funcion devuelve el objeto servicio que se encargara de 
  # atender a las acciones del controlador
  def service_object
    RolesActionDispatcher.new(consul_scope)
  end

  def allowed_params
    params.permit(:id, "_dc", :tpl, :page, :start, :limit, :app, :format, {sort: [:property, :direction]}, {record: [:app, :name, :description]})
  end
  
end
