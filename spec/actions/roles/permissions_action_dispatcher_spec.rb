require 'rails_helper'

RSpec.describe Roles::PermissionsActionDispatcher do
  it_should_behave_like ActsAsActionDispatcher, {
    factory: :role_permission,
    parent_attribute: :role_id,
    parent_factory: :role, 
    service_object: Roles::PermissionsActionDispatcher.new(RolePermission),
    scope: RolePermission,
    required_field: [:app, :permission],
    order_field: :app
  }

end