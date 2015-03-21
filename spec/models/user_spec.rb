require 'rails_helper'

RSpec.describe User, :type => :model do
  describe "definition" do
    before(:each) do
      @user = create(:user)
    end
    
    it {should validate_presence_of(:name)}
    it {should validate_presence_of(:surname)}
    it {should validate_presence_of(:gender)}
    it {should validate_presence_of(:email)}
#     it {should have_many(:user_providers)}
    it {should validate_uniqueness_of(:email)}

    it {should validate_length_of(:name).is_at_most(150)}
    it {should validate_length_of(:surname).is_at_most(150)}
    it {should validate_length_of(:password).is_at_least(4)}
    it {should validate_length_of(:address).is_at_most(1024)}
    it {should validate_length_of(:city).is_at_most(150)}
    it {should validate_length_of(:state).is_at_most(150)}
    it {should validate_length_of(:postal_code).is_at_most(50)}
    it {should validate_length_of(:phone1).is_at_most(50)}
    it {should validate_length_of(:phone2).is_at_most(50)}
    it {should validate_length_of(:email).is_at_most(50)}
    it {["blah", "blah@puff"].each {|v| should_not allow_value(v).for(:email)}}
    it {should allow_value("pepe@juan.com").for(:email)}
    it {should validate_length_of(:email2).is_at_most(50)}
    it {["blah", "blah@puff"].each {|v| should_not allow_value(v).for(:email2)}}
    it {should allow_value("pepe@juan.com").for(:email2)}
    
    it{should have_many(:role_users)}
    it{should have_many(:roles)}
  end
end
