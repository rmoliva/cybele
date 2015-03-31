require 'rails_helper'

RSpec.describe Entity, type: :model do
  describe "definition" do
    before(:each) do
      @entity = create(:entity)
    end 
    
    it{should validate_presence_of(:name)}
    it{should validate_length_of(:name).is_at_most(150)}
    it{should validate_uniqueness_of(:name).scoped_to(:parent_id)}
    
    it{should validate_length_of(:label).is_at_most(150)}
    it{should validate_length_of(:child_label).is_at_most(150)}
    it{should validate_length_of(:child_labels).is_at_most(150)}
    
    it{should belong_to(:country)}
  end
end
