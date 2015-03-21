class PermissionsController < ApplicationController
  include ActsAsAuthlogicController
  include ActsAsActionDispatcherController
  
  acts_as_action_dispatcher_controller
  
  # Esta funcion devuelve el objeto servicio que se encargara de 
  # atender a las acciones del controlador
  def service_object
    # No pasamos Scope al Action dispatcher porque no lo necesita
    # Pasamos el contexto de aplicacion directamente
    PermissionsActionDispatcher.new(application_context)
  end
  
  def allowed_params
    params.permit(:id, "_dc", :tpl, :page, :start, :limit, {sort: [:property, :direction]}, :scope)
  end
  
end
