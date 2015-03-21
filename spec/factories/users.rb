FactoryGirl.define do
  
  factory :user do
    name { Faker::Name.name }
    surname { Faker::Lorem.characters(50) }
    gender { User.new.assignable_genders.sample }
    active { true }
    email { Faker::Internet.email }
    pwd = Faker::Lorem.characters(20)
    password { pwd }
    password_confirmation { pwd }
  end

end