require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  
  describe "PUT #update" do
    before(:each) do
      @loged_user = create(:user) # TODO
      set_permission(@loged_user,"central","user","update")
      @record = create(:user)
      @record_new = attributes_for(:user)
      user_login(@loged_user)
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
      
      it "should return success:true message json" do
        put :update, :id => @record.id, :record => @record_new, :format => "json", :app=>'central' 
        expect(response.body).to be_json_success
      end
    end
  
    context "invalid attributes" do
      it "should return success:false message json" do
        @record_new[:name] = nil
        put :update, :id => @record.id, :record => @record_new, :format => "json", :app=>'central'
        parse_json = JSON(response.body)
        expect(response.body).to_not be_json_success
      end
    end
  end
end
