FactoryGirl.define do
  
  factory :country do
    code { (0...2).map { ('a'..'z').to_a[rand(26)] }.join }
    name { Faker::Name.name }
    comments { Faker::Lorem.characters(1024) }
  end
  
end