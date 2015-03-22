FactoryGirl.define do
  factory :entity do    
    name { Faker::Name.name }
    country
  end

end
