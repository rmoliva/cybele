FactoryGirl.define do
  factory :entity do    
    name { Faker::Name.name }
    label { Faker::Name.name }
    child_label { Faker::Name.name }
    child_labels { Faker::Name.name }
    country
  end

end
