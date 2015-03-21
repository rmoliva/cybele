# params:
#  - default_scope 

RSpec.shared_examples ActsAsPowerScope do |params|
  context "records" do
    it{expect(subject.records).to be_scope_eql(default_scope)}
  end
  context "creatable_records" do
    it{expect(subject.creatable_records).to be_scope_eql(default_scope)}
  end
  context "updatable_records" do
    it{expect(subject.updatable_records).to be_scope_eql(default_scope)}
  end
  context "destroyable_records" do
    it{expect(subject.destroyable_records).to be_scope_eql(default_scope)}
  end
end