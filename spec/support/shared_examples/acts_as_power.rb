# params:
#  - default_scope 

RSpec.shared_examples ActsAsPowerScope do |params|
  context "records" do
    it do 
      set_permission(user,params[:permission_app],params[:klass],"index")
      expect(subject.records).to be_scope_eql(default_scope)
    end
  end
  context "creatable_records" do
    it do 
      set_permission(user,params[:permission_app],params[:klass],"create")
      expect(subject.creatable_records).to be_scope_eql(default_scope)
    end
  end
  context "updatable_records" do
    it do 
      set_permission(user,params[:permission_app],params[:klass],"update")
      expect(subject.updatable_records).to be_scope_eql(default_scope)
    end
  end
  context "destroyable_records" do
    it do 
      set_permission(user,params[:permission_app],params[:klass],"destroy")
      expect(subject.destroyable_records).to be_scope_eql(default_scope)
    end
  end
end