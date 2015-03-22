module PermissionMacros
  # Establecer un permiso para el usuario pasado
  def set_permission(user,permission_app,klass,action)
    # Asignar un rol al usuario si es que no tiene
    role = user.roles.first
    role = create(:role, :app => 'central') unless role
    user.roles << role unless user.roles.include?(role)
    role.role_permissions.create!(:app => permission_app, :klass => klass, :action => action, :value => 1)
  end
  
end
