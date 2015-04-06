require 'rails_helper'

RSpec.describe Container, type: :model do
  describe "definition" do
    it{should validate_presence_of(:entity_id)}
    it{should validate_presence_of(:name)}
    it{should validate_length_of(:name).is_at_most(150)}
    
    it{should belong_to(:entity)}
  end
end
