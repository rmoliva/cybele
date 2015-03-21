class PermissionsActionDispatcher
  
  def initialize context
    @context = context
  end
  
  def show params
    scope = params[:id].blank? ? (raise I18n.t(:error_param_scope)) : params[:id]
    Permission.send(scope) if @context.can?(:permission, :show)
  end
  
end
