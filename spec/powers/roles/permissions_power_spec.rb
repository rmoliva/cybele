
require 'rails_helper'

RSpec.describe Roles::PermissionsPower, type: :model do
  
  describe "for all application contexts" do
    let(:user) {create(:user)}
    let(:context) do
      ApplicationContext.new(:app => "central", :entity_id => nil, :user => user)
    end
    let(:role){create(:role)}
    let(:default_scope) {role.role_permissions}
    subject{Roles::PermissionsPower.new(context,role.id)}
    it_should_behave_like ActsAsPowerScope, {
      :permission_app => "central",
      :klass => "role_permission"
    }
  end
end
