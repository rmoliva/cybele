
require 'rails_helper'

RSpec.describe Users::RolesPower, type: :model do
  let(:user) {create(:user)}
  let(:role){create(:role)}
  let(:network){create(:network)}
  
  describe "for central application context" do
    let(:context) do
      ApplicationContext.new(:app => "central", :entity_id => nil, :user => user)
    end
    let(:default_scope) {user.role_users}
    subject{Users::RolesPower.new(context,user.id)}
    it_should_behave_like ActsAsPowerScope
  end

  describe "for network application context" do
    let(:context) do
      ApplicationContext.new(:app => "network", :entity_id => network.id, :user => user)
    end
    let(:default_scope) {user.role_users.with_network(network)}
    subject{Users::RolesPower.new(context,user.id)}
    it_should_behave_like ActsAsPowerScope
  end
  
#  describe "for organzation application context" do
#    let(:user) {create(:user)}
#    let(:context) do
#      ApplicationContext.new(:app => "organization", :entity_id => nil, :user => user)
#    end
#    let(:role){create(:role)}
#    let(:default_scope) {user.roles}
#    subject{Users::RoleUsersPower.new(context,user.id)}
#    it_should_behave_like ActsAsPowerScope
#  end
  

end
