FactoryGirl.define do

  factory :role_permission do
    app { Role.new.assignable_apps.sample }
    klass { Faker::Name.name }
    action { Faker::Name.name }
    role
  end
  
end