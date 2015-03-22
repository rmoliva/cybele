RSpec::Matchers.define :be_json_success do
  match do |actual|
    parse_json = JSON(actual)
    parse_json["success"] == true
  end

  failure_message do |actual|
    "expected json.success to be true"
  end
  
  failure_message_when_negated do |actual|
    "expected json.success to be false"
  end
  
  description do |actual|
    "be json.success true"
  end
  
end
