require 'rails_helper'

RSpec.describe Users::RolesActionDispatcher do
  it_should_behave_like ActsAsActionDispatcher, {
    factory: :role_user,
    service_object: Users::RolesActionDispatcher.new(RoleUser),
    scope: RoleUser,
    required_field: [:user_id, :role_id],
    order_field: :user_id
  }

end