require 'rails_helper'

RSpec.describe Permission, :type => :model do
  describe "can?" do
    let(:klass) {"test"}
    let(:action) {"index"}
    
    let(:user) {create(:user)}
    let(:permission) {Permission.new(user)}

    # Rol del usuario a nivel central
    let(:rc) {create(:role, :app => 'central')}
    
    before(:each) do
      user.role_users.create!(:role_id => rc.id)
    end

    describe "in central context" do
      context "permission on rc (central)" do
        before(:each) do
          create(:role_permission, :role_id => rc.id, :app => 'central', :klass => klass, :action => action, :value => 1)
        end
        
        it "access rc" do
          expect(permission.can?("central", nil, klass, action)).to eql(1)
        end
      end
    end # in central context 
  end
end
