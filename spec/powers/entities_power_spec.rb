require 'rails_helper'

RSpec.describe EntitiesPower, type: :model do
  
  describe "for central application contexts" do
    let(:user) {create(:user)}
    let(:context) do
      ApplicationContext.new(:app => "central", :entity_id => nil, :user => user)
    end
    let(:default_scope) {Entity}
    
    subject{EntitiesPower.new(context)}
    it_should_behave_like ActsAsPowerScope, {
      :permission_app => "central",
      :klass => "entity"
    }
  end

 describe "for entity application contexts" do
   let(:user) {create(:user)}
   let(:entity) { create(:entity) }
   let(:context) do
     ApplicationContext.new(:app => "entity", :entity_id => entity.id, :user => user)
   end
   let(:default_scope) {entity.children}
   subject{EntitiesPower.new(context)}
   it_should_behave_like ActsAsPowerScope, {
      :permission_app => "entity",
      :klass => "entity"
    }
 end
  
  # describe "for organization application contexts" do
    # let(:user) {build_stubbed(:user)}
    # let(:organization) { create(:organization) }
    # let(:context) do
      # ApplicationContext.new(:app => "organization", :entity_id => organization.id, :user => user)
    # end
    # let(:default_scope) {organization.users}
    # subject{UsersPower.new(context)}
    # it_should_behave_like ActsAsPowerScope
  # end
end
