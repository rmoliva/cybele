
require 'rails_helper'

RSpec.describe Users::RolesPower, type: :model do
  let(:user) {create(:user)}
  let(:role){create(:role)}
  let(:entity){create(:entity)}
  
  describe "for central application context" do
    let(:context) do
      ApplicationContext.new(:app => "central", :entity_id => nil, :user => user)
    end
    let(:default_scope) {user.role_users}
    subject{Users::RolesPower.new(context,user.id)}
    it_should_behave_like ActsAsPowerScope, {
      :permission_app => "central",
      :klass => "role_user"
    }
  end
end
