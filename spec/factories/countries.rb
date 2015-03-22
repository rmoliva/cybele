FactoryGirl.define do
  
  factory :country do
    code { Faker::Name.name[0..1] }
    name { Faker::Name.name }
    comments { Faker::Lorem.characters(1024) }
  end
  
end