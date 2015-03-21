require 'rails_helper'

RSpec.describe CurrentUserActionDispatcher do
  
  describe "SHOW current user" do
    let(:user){build_stubbed(:user)}
    let(:dispatcher){CurrentUserActionDispatcher.new(user)}
    subject{dispatcher.show({})}
    
    it "Located the current user" do
      expect(subject).to eql(user)
    end
  end
  
  describe "UPDATE current user" do
    
    before(:each) do
      @loged_user = nil # TODO
      @user = create(:user)
      @user_new = attributes_for(:user)
    end

    let(:dispatcher){CurrentUserActionDispatcher.new(@user)}
    subject{dispatcher}

    context "with good attributes" do
      it "should update a new record correctly" do
        expect{subject.update(:record => @user_new)}.to_not change(User,:count)
      end
      
      it "should return the updated object" do
        object = subject.update(:record => @user_new)
        @user.reload
        expect(@user).to eq(object)
       end
    end
    
    context "with bad attributes" do
      it "should raise an exception" do
        @user_new['name'] = nil
        expect{subject.update(:record => @user_new)}.to raise_error(Exception)
      end
    end
   
  end
              
end
      
      
      
      
      
      # get :show
      # expect(:current_user => user_to_hash(user)).to eql(user)
    # end
#     
    # it "changes @user attributes" do
      # #put :update, :user_session => user_to_hash(@user_new)
      # @user.reload
      # match_users(@user,@user_new).should be_true
    # end
#     
  # end

  # describe "invalid attributes" do
    # it "locates the requested @user" do
      # user = User::Admin.make(:invalid)
      # put :update, :user_session => user_to_hash(user)
      # assigns(:user).should eq(@user)
    # end
# 
    # it "does not change @user's attributes" do
      # user = User::Admin.make(:invalid)
      # user_old = @user
      # put :update, :user_session => user_to_hash(user)
      # @user.reload
      # match_users(@user,user_old).should be_true
    # end
# 
    # it "re-renders the edit method" do
      # user = User::Admin.make(:invalid)
      # put :update, :user_session => user_to_hash(user)
      # response.should render_template :edit
    # end
  # end
# end
  
  
  
  
  
  
  
  
  # ApplicationContext.apps.each do |app|
    # describe "for application: #{app}" do
      # case app
        # when "central"
          # let(:context) do
            # ApplicationContext.new(:app => app, :entity_id => nil, :user => user)
          # end
          # let(:dispatcher){PermissionsActionDispatcher.new(context)}
          # ApplicationContext.apps.each do |app_scope|
            # context "to get #{app_scope} permissions" do
              # subject{dispatcher.show({:id => app_scope})}
              # it "with permission permission_index should return permission list of #{app_scope}" do
                # expect(subject).to eql(Permission.send(app_scope.to_sym))
              # end
#               
              # it "without permission permission_index should return nil" do
                # pending("Permission system is not working yet")
              # end
            # end
#             
          # end
        # when "network"
          # let(:context) do
            # ApplicationContext.new(:app => app, :entity_id => network, :user => user)
          # end
          # let(:dispatcher){PermissionsActionDispatcher.new(context)}
          # ApplicationContext.apps.each do |app_scope|
            # subject{dispatcher.show({:id => app_scope})}
            # it "should return nil for permission list of #{app_scope}" do
              # expect(subject).to be_nil
            # end
          # end
        # when "organization"
          # it "should return nil" do
            # pending("Not implemented for organization yet")
          # end
        # end
#       
    # end
  # end
#   
# end