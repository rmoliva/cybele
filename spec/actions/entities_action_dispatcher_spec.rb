require 'rails_helper'

RSpec.describe EntityActionDispatcher do
  it_should_behave_like ActsAsActionDispatcher, {
    factory: :entity,
    service_object: EntityActionDispatcher.new(Entity),
    scope: Entity,
    required_field: [:name],
    order_field: :name
  }

end