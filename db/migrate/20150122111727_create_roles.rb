class CreateRoles < ActiveRecord::Migration
  class << self
    def up
      create_table :roles do |t|
        t.string  :app, null: false, limit: 20
        t.string  :name, null: false, limit: 250
        t.string  :description, null: true, limit: 250
        t.timestamps null: false
      end
  
      add_index :roles, :name
      add_index :roles, :app
      add_index :roles, [:name, :app], unique: true
    end
    
    def down
      drop_table :roles
    end
    
  end
end
