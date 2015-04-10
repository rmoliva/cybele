FactoryGirl.define do
  factory :container do
    entity
    entity_type { Faker::Name.name }
    name { Faker::Name.name }
  end
end
