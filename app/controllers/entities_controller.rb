class EntitiesController < ApplicationController
  include ActsAsAuthlogicController
  include ActsAsConsulController
  include ActsAsActionDispatcherController
  
  acts_as_consul_controller
  acts_as_action_dispatcher_controller
  
  # Esta funcion devuelve el power de consul que utilizara este 
  # controlador
  def controller_power
    EntitiesPower.new(application_context)
  end
  
  # Esta funcion devuelve el objeto servicio que se encargara de 
  # atender a las acciones del controlador
  def service_object
    EntitiesActionDispatcher.new(consul_scope)
  end

  def allowed_params
    params.permit common_allowed_params({record: [:name]})
  end
  
end
