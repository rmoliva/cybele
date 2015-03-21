module ActsAsAuthlogicController
  extend ::ActiveSupport::Concern

  included do
    helper_method :current_user_session, :current_user, :application_context
    before_action :require_user
  end

  module ClassMethods
  end
  
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end
  
  # Devolver el contexto de aplicacion que van a utilizar los powers para
  # realizar los scopes
  def application_context
    ApplicationContext.new(
      :app => params[:app], 
      :entity_id => params[:entity_id],
      :user => current_user,
    )
  end

  def require_user
    unless current_user
      render :json => {:success => false, :message => "Debe logearse para acceder"},
        :layout => false, :content_type => 'application/json', :status => 401
    end
  end
    
  
end