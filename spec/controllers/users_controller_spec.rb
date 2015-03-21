require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  
  describe "PUT #update" do
    before(:each) do
      @loged_user = nil # TODO
      @record = create(:user)
      @record_new = attributes_for(:user)
    end
    
    subject{UserActionDispatcher.new(User)}
  
    context "valid attributes" do
      it "located the requested user" do
        expect{put :update, :id => @record.id, :record => @record_new, :format => "json", :app=>'central'}.to_not change(User,:count)
      end
  
      it "changes user attributes" do
        put :update, :id => @record.id, :record => @record_new, :format => "json", :app=>'central' 
        @record.reload
        expect(match_users(@record,@record_new)).to eq(true)
      end
      
    end
  
    context "invalid attributes" do
      it "should return success:false message json" do
        @record_new[:name] = nil
        put :update, :id => @record.id, :record => @record_new, :format => "json", :app=>'central'
        parse_json = JSON(response.body)
        expect(parse_json["success"]).to eq(false)
      end
    end
  end
end
