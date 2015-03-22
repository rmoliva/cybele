require 'rails_helper'

RSpec.describe Permission, :type => :model do
  describe "can?" do
    let(:klass) {"test"}
    let(:action) {"index"}
    
    let(:user) {create(:user)}
    let(:permission) {Permission.new(user)}

    # Entidad 1 y Entidad 2
    let(:r1) {create(:entity)}
    let(:r2) {create(:entity)}
    
    # Entidades 1 y 2 de la primera Entidad
    let(:o11) {create(:entity, :parent => r1)}
    let(:o12) {create(:entity, :parent => r1)}

    # Entidades 1 y 2 de la segunda Entidad
    let(:o21) {create(:entity, :parent => r2)}
    let(:o22) {create(:entity, :parent => r2)}

    # Rol del usuario a nivel central
    let(:rc) {create(:role, :app => 'central')}
    
    # Rol del usuario de las dos entidades raiz
    let(:rn1) {create(:role, :app => 'entity')}
    let(:rn2) {create(:role, :app => 'entity')}

    # Rol del usuario de dos entidades (una de cada entidad raiz)
    let(:ro1) {create(:role, :app => 'entity')}
    let(:ro2) {create(:role, :app => 'entity')}
    
    before(:each) do
      user.role_users.create!(:role_id => rc.id)
      user.role_users.create!(:role_id => rn1.id, :entity_type => 'Entity', :entity_id => r1.id)
      user.role_users.create!(:role_id => rn2.id, :entity_type => 'Entity', :entity_id => r2.id)
      user.role_users.create!(:role_id => ro1.id, :entity_type => 'Entity', :entity_id => o11.id)
      user.role_users.create!(:role_id => ro2.id, :entity_type => 'Entity', :entity_id => o21.id)
    end

    describe "in subentity context" do
      context "permission on ro1 (subentity)" do
        before(:each) do
          create(:role_permission, :role_id => ro1.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end
        
        it "access o11" do
          expect(permission.can?("entity", o11, klass, action)).to eql(1)
        end
        
        it "not access o12" do
          expect(permission.can?("entity", o12, klass, action)).to be_nil
        end 

        it "not access o21" do
          expect(permission.can?("entity", o21, klass, action)).to be_nil
        end 
        
        it "not access o22" do
          expect(permission.can?("entity", o22, klass, action)).to be_nil
        end 
      end 
      
      context "permission on ro2 (subentity)" do
        before(:each) do
          create(:role_permission, :role_id => ro2.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end
        
        it "not access o11" do
          expect(permission.can?("entity", o11, klass, action)).to be_nil
        end 

        it "not access o12" do
          expect(permission.can?("entity", o12, klass, action)).to be_nil
        end 

        it "access o21" do
          expect(permission.can?("entity", o21, klass, action)).to eql(1)
        end
        
        it "not access o22" do
          expect(permission.can?("entity", o22, klass, action)).to be_nil
        end 
      end 

      context "permission on rn1 (root entity)" do
        before(:each) do
          create(:role_permission, :role_id => rn1.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end
        
        it "access o11" do
          expect(permission.can?("entity", o11, klass, action)).to eql(1)
        end 

        it "access o12" do
          expect(permission.can?("entity", o12, klass, action)).to eql(1)
        end 

        it "access o21" do
          expect(permission.can?("entity", o21, klass, action)).to be_nil
        end
        
        it "not access o22" do
          expect(permission.can?("entity", o22, klass, action)).to be_nil
        end 
      end 

      context "permission on rn2 (root entity)" do
        before(:each) do
          create(:role_permission, :role_id => rn2.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end

        it "not access o11" do
          expect(permission.can?("entity", o11, klass, action)).to be_nil
        end 

        it "not access o12" do
          expect(permission.can?("entity", o12, klass, action)).to be_nil
        end 

        it "access o21" do
          expect(permission.can?("entity", o21, klass, action)).to eql(1)
        end
        
        it "access o22" do
          expect(permission.can?("entity", o22, klass, action)).to eql(1)
        end 
      end 
      
      context "permission on rc (central)" do
        before(:each) do
          create(:role_permission, :role_id => rc.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end

        it "access o11" do
          expect(permission.can?("entity", o11, klass, action)).to eql(1)
        end 

        it "access o12" do
          expect(permission.can?("entity", o12, klass, action)).to eql(1)
        end 

        it "access o21" do
          expect(permission.can?("entity", o21, klass, action)).to eql(1)
        end
        
        it "access o22" do
          expect(permission.can?("entity", o22, klass, action)).to eql(1)
        end 
      end 
    end # in subentity context

    describe "in root entity context" do
      context "permission on rn1 (root entity)" do
        before(:each) do
          create(:role_permission, :role_id => rn1.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end
        
        it "access r1" do
          expect(permission.can?("entity", r1, klass, action)).to eql(1)
        end
        
        it "not access r2" do
          expect(permission.can?("entity", r2, klass, action)).to be_nil
        end
      end 
      context "permission on rn2 (root entity)" do
        before(:each) do
          create(:role_permission, :role_id => rn2.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end
        
        it "not access r1" do
          expect(permission.can?("entity", r1, klass, action)).to be_nil
        end

        it "access r2" do
          expect(permission.can?("entity", r2, klass, action)).to eql(1)
        end
      end       
      context "permission on rc (central)" do
        before(:each) do
          create(:role_permission, :role_id => rc.id, :app => 'entity', :klass => klass, :action => action, :value => 1)
        end
        
        it "access r1" do
          expect(permission.can?("entity", r1, klass, action)).to eql(1)
        end

        it "access r2" do
          expect(permission.can?("entity", r2, klass, action)).to eql(1)
        end
      end 
    end # in network context

    describe "in central context" do
      context "permission on rc (central)" do
        before(:each) do
          create(:role_permission, :role_id => rc.id, :app => 'central', :klass => klass, :action => action, :value => 1)
        end
        
        it "access rc" do
          expect(permission.can?("central", nil, klass, action)).to eql(1)
        end
      end
    end # in central context 
  end
end
