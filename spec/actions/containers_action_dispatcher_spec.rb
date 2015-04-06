require 'rails_helper'

RSpec.describe ContainersActionDispatcher do
  it_should_behave_like ActsAsActionDispatcher, {
    factory: :container,
    service_object: ContainersActionDispatcher.new(Container),
    scope: Container,
    required_field: [:name],
    order_field: :name
  }

end