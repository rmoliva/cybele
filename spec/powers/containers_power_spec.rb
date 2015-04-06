require 'rails_helper'

RSpec.describe ContainersPower, type: :model do
  
  describe "for entity application contexts" do
    let(:user) {create(:user)}
    let(:entity) {create(:entity)}
    let(:container_name) {"prueba"}
    let(:context) do
      ApplicationContext.new(:app => "entity", :entity_id => entity.id, :user => user)
    end
    let(:default_scope) {entity.containers.with_name(container_name)}
    
    subject{ContainersPower.new(context,container_name)}
    it_should_behave_like ActsAsPowerScope, {
      :permission_app => "entity",
      :klass => "container"
    }
  end
end
