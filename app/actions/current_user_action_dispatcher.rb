class CurrentUserActionDispatcher
  
  def initialize user
    @user = user
  end
  
  # Es una accion de tipo coleccion, a diferencia del estandar REST
  # esto es porque solo se puede modificar la cuenta propia
  def show params 
    # Solo se puede mostrar al propio usuario
    @user
  end
  
  def update params
    # Solo se puede modificar al propio usuario
    if @user.update_attributes!(params[:record])
      @user
    else        
      @user.errors
    end
  end
  
  def permissions params
    # Solo se puede mostrar al propio usuario
    raise I18n.t('param.no_app') if params[:app].blank?
    perm = Permission.send(params['app']) 
    
    permissions = {}
    perm.each do |p, a|
      permissions[p] ||= {}
      a.each do |action|
        permissions[p][action] ||= 1
      end     
    end   
     
    permissions
  end

end
