require 'rails_helper'

RSpec.describe Country, type: :model do
  
  describe "definition" do
    before(:each) do
      @country = create(:country)
    end

    it{should validate_presence_of(:code)}
    it{should validate_presence_of(:name)}
    it{should validate_uniqueness_of(:code)}
    it{should validate_uniqueness_of(:name)}
    it{should validate_length_of(:code).is_at_most(2)}
    it{should validate_length_of(:name).is_at_most(250)}

  end

end
