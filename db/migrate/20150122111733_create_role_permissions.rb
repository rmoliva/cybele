class CreateRolePermissions < ActiveRecord::Migration
  class << self
    def up
      create_table :role_permissions, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8' do |t|
        t.integer :role_id, null: false
        t.string  :app, null: false, limit: 20
        t.string :klass, null: false, limit: 50
        t.string :action, null: false, limit: 50
        t.integer :value, null: true, default: nil
        t.timestamps null: false
      end
      
      add_index :role_permissions, :app
      add_index :role_permissions, [:app, :klass, :action]
      add_index :role_permissions, [:role_id, :app, :klass, :action], unique: true
      add_foreign_key(:role_permissions, :roles, dependent: :restrict)
    end
    
    def down
      drop_table :role_permissions
    end  
    
  end
end
