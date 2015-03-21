
class CreateRoleUsers < ActiveRecord::Migration
  class << self
    def up
      create_table :role_users do |t|
        t.integer :user_id, :null => false
        t.integer :role_id, :null => false
        t.string  :entity_type, :null => true, limit: 20
        t.integer :entity_id, :null => true
        t.timestamps null: false
      end
      add_index :role_users, [:user_id, :role_id], :unique => true
      add_foreign_key(:role_users, :users, :dependent => :restrict)
      add_foreign_key(:role_users, :roles, :dependent => :restrict)
    end
    
    def down
      drop_table :role_users
    end  
  end
end