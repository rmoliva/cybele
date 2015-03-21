require 'rails_helper'

# RSpec.describe UsersActionDispatcher do
  # it_should_behave_like ActsAsActionDispatcher, {
    # factory: :user,
    # service_object: UsersActionDispatcher.new(User),
    # scope: User,
    # required_field: :name,
    # order_field: :surname
  # }
# end


RSpec.describe UsersActionDispatcher do
  
  describe "index" do
    before(:each) do
      @loged_user = nil # TODO
      @records = build_stubbed_list(:user, 40)
    end
    subject{UsersActionDispatcher.new(User)}
    
    it "should return first 30 records" do
      expect = User.page(1).per(30).order("#{:surname} asc")
      expect(subject.index(:per_page=>30).first).to match_array(expect)
    end
    
    it "should return last 10 records" do
      expect = User.page(2).per(30).order("#{:surname} asc")
      expect(subject.index(:page=>2,:per_page=>30).first).to match_array(expect)
    end
    
    it "should order correclty by name desc" do
      expect = User.page(2).per(30).order("name desc")
      expect(subject.index(:page=>2,:per_page=>30, :sort => "name", :dir => "desc").first).to eq(expect)
    end
  end
  
  describe "show" do
    
    before(:each) do
      @loged_user = nil # TODO
      @record = create(:user)
    end

    subject{UsersActionDispatcher.new(User)}
    
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
      @record = attributes_for(:user)
    end
    
    subject{UsersActionDispatcher.new(User)}

    context "with good attributes" do
      it "should create a new record correctly" do
        expect{subject.create(:record => @record)}.to change(User,:count).by(1)
      end
      
      it "should return the created object" do
        object = subject.create(:record => @record)
        expect(User.last).to eq(object)
      end
    end
    
    
    context "with bad attributes" do
      it "should raise an exception" do
        @record[:name] = nil
        expect{subject.create(:record => @record)}.to raise_error(Exception)
      end
    end
  end
  
  describe "update" do
    before(:each) do
      @loged_user = nil # TODO
      @record = create(:user)
      @record_new = attributes_for(:user)
    end
    
    subject{UsersActionDispatcher.new(User)}

    context "with good attributes" do
      it "should update a new record correctly" do
        expect{subject.update(:id => @record.id, :record => @record_new)}.to_not change(User,:count)
      end
      
      it "should return the updated object" do
        object = subject.update(:id => @record.id, :record => @record_new)
        @record.reload
        expect(@record).to eq(object)
      end
    end
    
    
    context "with bad attributes" do
      it "should raise an exception" do
        @record_new[:name] = nil
        expect{subject.update(:id => @record.id, :record => @record_new)}.to raise_error(Exception)
      end
    end
  end
  
  describe "destroy" do
    before(:each) do
      @loged_user = nil # TODO
      @record = create(:user)
    end
    
    subject{UsersActionDispatcher.new(User)}

    context "with existing record" do
      it "should destroy the record correctly" do
        expect{subject.destroy(:id => @record.id)}.to change(User,:count).by(-1)
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