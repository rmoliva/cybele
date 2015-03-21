class SessionsController < ApplicationController
  include ActsAsAuthlogicController
  include ExtJsRendererController

  before_action :require_user, :only => [:destroy]
  
  def show
    extjs_render {current_user}
  end

  def create
    extjs_render do
      # Primero comprobar que el usuario esta activo
      user = User.find_by_email(params[:record][:email])
      raise "Datos de acceso incorrectos." if user.nil? or !user.active

      # Modificar el remember_me ("on" => true)
      params[:record][:remember_me] = params[:record][:remember_me].to_boolean if params[:record][:remember_me]
      @user_session = UserSession.new(params[:record])
      @user_session.save!
      @user_session
    end
  end    

  def destroy
    extjs_render do
      current_user_session.destroy
      current_user_session
    end
  end
  
end
