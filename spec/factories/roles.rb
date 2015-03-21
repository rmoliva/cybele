FactoryGirl.define do
  
  factory :role do
    name { Faker::Name.name }
    description { Faker::Lorem.characters(250) }
    app { Role.new.assignable_apps.sample }
  end

end