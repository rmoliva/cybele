# params:
#  - factory 
#  - service_object
#  - scope
#  - required_field


RSpec.shared_examples ActsAsActionDispatcher do |params|
  
  describe "index" do
    before(:each) do
      @loged_user = nil # TODO
      @records = build_stubbed_list(params[:factory], 40)
    end
    subject{params[:service_object]}
    
    it "should return first 30 records" do
      expect = params[:scope].page(1).per(30).order("#{params[:order_field]} asc")
      expect(subject.index(:per_page=>30).first).to match_array(expect)
    end
    
    it "should return last 10 records" do
      expect = params[:scope].page(2).per(30).order("#{params[:order_field]} asc")
      expect(subject.index(:page=>2,:per_page=>30).first).to match_array(expect)
    end
    
    it "should order correclty by name desc" do
      expect = params[:scope].page(2).per(30).order("name desc")
      expect(subject.index(:page=>2,:per_page=>30, :sort => "name", :dir => "desc").first).to eq(expect)
    end
  end
  
  describe "show" do
    
    before(:each) do
      @loged_user = nil # TODO
      @record = create(params[:factory])
    end

    subject{params[:service_object]}
    
    context "with a valid id" do
      it "should return the model" do
        expect(subject.show(:id => @record.id)).to eql(@record)
      end
    end
    
    context "with an invalid id" do
      it "should raise an exception" do
        expect{subject.show(:id => @record.id + 1)}.to raise_error(Exception)
      end
    end
  end
  
  describe "create" do
    before(:each) do
      @loged_user = nil # TODO

      if(params[:parent_attribute])
        parent = FactoryGirl.create(params[:parent_factory])
        @record = build(params[:factory]).attributes.symbolize_keys.merge(params[:parent_attribute] => parent.id)
      else
        @record = build(params[:factory]).attributes.symbolize_keys
      end
      @record = params[:parse_attributes].call(:create, @record) if params[:parse_attributes]
    end
    
    subject{params[:service_object]}

    context "with good attributes" do
      it "should create a new record correctly" do
        expect{subject.create(:record => @record)}.to change(params[:scope],:count).by(1)
      end
      
      it "should return the created object" do
        object = subject.create(:record => @record)
        expect(params[:scope].last).to eq(object)
      end
    end
    
    
    context "with bad attributes" do
      it "should raise an exception" do
        @record[params[:required_field]] = nil
        expect{subject.create(:record => @record)}.to raise_error(Exception)
      end
    end
  end
  
  describe "update" do
    before(:each) do
      @loged_user = nil # TODO
      @record = create(params[:factory])
      @record_new = attributes_for(params[:factory])
      @record_new = params[:parse_attributes].call(:update, @record_new) if params[:parse_attributes]
    end
    
    subject{params[:service_object]}

    context "with good attributes" do
      it "should update a new record correctly" do
        expect{subject.update(:id => @record.id, :record => @record_new)}.to_not change(params[:scope],:count)
        
      end
      
      it "should return the updated object" do
        object = subject.update(:id => @record.id, :record => @record_new)
        @record.reload
        expect(@record).to eq(object)
      end
    end
    
    
    context "with bad attributes" do
      it "should raise an exception" do
        @record_new[params[:required_field]] = nil
        expect{subject.update(:id => @record.id, :record => @record_new)}.to raise_error(Exception)
      end
    end
  end
  
  describe "destroy" do
    before(:each) do
      @loged_user = nil # TODO
      @record = create(params[:factory])
    end
    
    subject{params[:service_object]}

    context "with existing record" do
      it "should destroy the record correctly" do
        expect{subject.destroy(:id => @record.id)}.to change(params[:scope],:count).by(-1)
      end
      
      it "should return the deleted object" do
        object = subject.destroy(:id => @record.id)
        expect(@record).to eq(object)
      end
    end
    
    
    context "with non existant record" do
      it "should raise an exception" do
        expect{subject.destroy(:id => @record.id+1)}.to raise_error(Exception)
      end
    end
  end
  
  
  
end