require 'rails_helper'

RSpec.describe EntityActionDispatcher do
  it_should_behave_like ActsAsActionDispatcher, {
    factory: :entity,
    service_object: EntityActionDispatcher.new(Entity),
    scope: Entity,
    required_field: [:name],
    order_field: :name,
    parse_attributes: lambda do |action, record|
      # Esta funcion sera llamada para procesar los atributos de un registro 
      # action = create: Atributos que se utilizaran para crear un registro nuevo
      # action = update: Atributos que se utilizaran para modificar un registro ya existente
      if (action.to_sym == :create)
        record.delete(:lft)
        record.delete(:rgt)
        record.delete(:depth)
      end
      record
    end 
  }

end