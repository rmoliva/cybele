module AuthlogicMacros  
  def user_login(user)
    UserSession.create(user ? user : nil)
  end
end