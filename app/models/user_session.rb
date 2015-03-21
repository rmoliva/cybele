class UserSession < Authlogic::Session::Base
  include ::UserSessionTpl
  
#  def self.find(*args)
#    RAILS_DEFAULT_LOGGER.info "----> UserSession::find"
#    with_scope( :find => {:conditions => ["empresa_id is null"] } ) do
#      super(*args)
#    end
#  end
#  def self.create!(*args)
#    RAILS_DEFAULT_LOGGER.info "----> UserSession::create!"
#    with_scope( :find => {:conditions => ["empresa_id is null"] } ) do
#      super(*args)
#    end
#  end
#  def self.create(*args)
#    with_scope( :find => {:conditions => ["empresa_id is null"] } ) do
#      super(*args)
#    end
#  end
  
  # Scopes

  
  def self.find_by_credentials(login, password)
    session = UserSession.new(login: login, password: password)
    session.save if (session && session.user)
    session
  end
  
  
end
