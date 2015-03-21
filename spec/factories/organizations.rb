FactoryGirl.define do
  
  factory :organization do
    name { Faker::Name.name }
    description { Faker::Lorem.characters(250) }
  end 
  
end