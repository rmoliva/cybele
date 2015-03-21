RSpec::Matchers.define :be_scope_eql do |expected|
  match do |actual|
    parse(actual) == parse(expected)
  end

  failure_message do |actual|
    "expected SQL \"#{parse(actual)}\" to be the same as \"#{parse(expected)}\""
  end
  
  failure_message_when_negated do |actual|
    "expected SQL \"#{parse(actual)}\" not to be the same as \"#{parse(expected)}\""
  end
  
  description do |actual|
    "be \"#{parse(actual)}\" SQL"
  end
  
  def parse(scope)
    scope.scoped.to_sql
  end
  
end
