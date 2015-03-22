require 'rails_helper'

RSpec.describe RolesPower, type: :model do
  
  describe "for central application context" do
    let(:user) {create(:user)}
    let(:context) do
      ApplicationContext.new(:app => "central", :entity_id => nil, :user => user)
    end
    
    context "without app filter" do
      let(:default_scope) {Role}
      subject{RolesPower.new(context, nil)}
      it_should_behave_like ActsAsPowerScope,{
        :permission_app => "central",
        :klass => "role"
      }
    end
    
    context "with app filter" do
      let(:filter_app) {"entity"}
      subject{RolesPower.new(context, filter_app)}
      let(:default_scope) {Role.with_app(filter_app)}
      it_should_behave_like ActsAsPowerScope, {
        :permission_app => "central",
        :klass => "role"
      }
    end
  end
end
