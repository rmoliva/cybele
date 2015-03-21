require 'rails_helper'

RSpec.describe RolePermission, type: :model do
  describe "definition" do
    before(:each) do
      @role_permission = create(:role_permission)
    end
    
    it {should validate_presence_of(:app)}
    it {should validate_presence_of(:role_id)}
    it {should validate_presence_of(:klass)}
    it {should validate_presence_of(:action)}

    it {should validate_length_of(:app).is_at_most(20)}
    it {should validate_length_of(:klass).is_at_most(50)}
    it {should validate_length_of(:action).is_at_most(50)}
    
    it {should validate_uniqueness_of(:action).scoped_to(:role_id,:app,:klass)}
    
    it {should belong_to(:role)}
  end
end
