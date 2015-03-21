require 'rails_helper'

RSpec.describe Role, type: :model do
  describe "definition" do
    before(:each) do
      @role = create(:role)
    end
    
    it {should validate_presence_of(:name)}
    it {should validate_presence_of(:app)}

    it {should have_many(:role_permissions)}

    it {should validate_length_of(:name).is_at_most(250)}
    it {should validate_length_of(:app).is_at_most(20)}
    it {should validate_length_of(:description).is_at_most(250)}
    it {should validate_uniqueness_of(:name).scoped_to(:app)}
    
    it{should have_many(:role_permissions)}
    it{should have_many(:role_users)}
    it{should have_many(:users)}
  end
end
