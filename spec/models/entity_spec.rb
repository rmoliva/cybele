require 'rails_helper'

RSpec.describe Entity, type: :model do
  describe "definition" do
    before(:each) do
      @entity = create(:entity)
    end 
    
    it{should validate_presence_of(:name)}
    it{should validate_length_of(:name).is_at_most(150)}
    it{should validate_uniqueness_of(:name).scoped_to(:parent_id)}
    
    it{should validate_length_of(:address).is_at_most(250)}
    it{should validate_length_of(:city).is_at_most(150)}
    it{should validate_length_of(:state).is_at_most(150)}
    it{should validate_length_of(:postal_code).is_at_most(50)}
    it{should validate_length_of(:phone1).is_at_most(50)}
    it{should validate_length_of(:phone2).is_at_most(50)}
    it{should validate_length_of(:email1).is_at_most(100)}
    it{should validate_length_of(:email2).is_at_most(100)}
    
    it{should belong_to(:country)}
  end
end
