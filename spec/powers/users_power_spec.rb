require 'rails_helper'

RSpec.describe UsersPower, type: :model do
  
  describe "for central application contexts" do
    let(:user) {build_stubbed(:user)}
    let(:context) do
      ApplicationContext.new(:app => "central", :entity_id => nil, :user => user)
    end
    let(:default_scope) {User}
    subject{UsersPower.new(context)}
    it_should_behave_like ActsAsPowerScope
  end

#  describe "for network application contexts" do
#    let(:user) {build_stubbed(:user)}
#    let(:network) { create(:network) }
#    let(:context) do
#      ApplicationContext.new(:app => "network", :entity_id => network.id, :user => user)
#    end
#    let(:default_scope) {network.users}
#    subject{UsersPower.new(context)}
#    it_should_behave_like ActsAsPowerScope
#  end
  
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
