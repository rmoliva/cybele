require 'rails_helper'

RSpec.describe RoleUser, :type => :model do
  describe "definition" do
    before(:each) do
      @role_user = create(:role_user)
    end

    it{should validate_presence_of(:role_id)}
    it{should validate_presence_of(:user_id)}
    it{should validate_uniqueness_of(:user_id).scoped_to(:role_id)}
    
    it{should belong_to(:role)}
    it{should belong_to(:user)}
  end
end
