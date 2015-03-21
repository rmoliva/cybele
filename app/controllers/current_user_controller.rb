class CurrentUserController < ApplicationController
  include ActsAsAuthlogicController
  include ActsAsActionDispatcherController
   
  acts_as_action_dispatcher_controller
  
  # Esta funcion devuelve el objeto servicio que se encargara de 
  # atender a las acciones del controlador
  def service_object
    # No pasamos Scope al Action dispatcher porque no lo necesita
    CurrentUserActionDispatcher.new(current_user)
  end

  def allowed_params
    params.permit common_allowed_params({record: [:name, :email, :surname, :gender, :address, :city, :state, :postal_code, :phone1, :phone2, :email2, :password, :password_confirmation, :active]})
  end
  
end
