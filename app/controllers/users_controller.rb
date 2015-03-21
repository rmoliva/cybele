class UsersController < ApplicationController
  include ActsAsAuthlogicController
  include ActsAsConsulController
  include ActsAsActionDispatcherController
  
  acts_as_consul_controller do |config|
    config.power_options = {:crud => :users}
  end

  acts_as_action_dispatcher_controller
  
  # Esta funcion devuelve el power de consul que utilizara este 
  # controlador
  def controller_power
    UsersPower.new(application_context)
  end
  
  # Esta funcion devuelve el objeto servicio que se encargara de 
  # atender a las acciones del controlador
  def service_object
    UsersActionDispatcher.new(consul_scope)
  end

  def allowed_params
    params.permit common_allowed_params({record: [:name, :email, :surname, :gender, :address, :city, :state, :postal_code, :phone1, :phone2, :email2, :password, :password_confirmation, :active]})

  end
  
end
