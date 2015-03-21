require 'rails_helper'

RSpec.describe RolesActionDispatcher do
  it_should_behave_like ActsAsActionDispatcher, {
    factory: :role,
    service_object: RolesActionDispatcher.new(Role),
    scope: Role,
    required_field: [:name, :app],
    order_field: :app
  }

end