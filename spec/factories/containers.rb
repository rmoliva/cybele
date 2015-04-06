FactoryGirl.define do
  factory :container do
    entity
    name { Faker::Name.name }
  end
end
