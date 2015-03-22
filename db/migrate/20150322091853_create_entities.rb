class CreateEntities < ActiveRecord::Migration
  def change
    create_table :entities do |t|
      t.string :name,  :limit => 150, :null => false, :index => true
      t.string  :address, :null => true, :limit => 250
      t.string  :city, :null => true, :limit => 150
      t.string  :state, :null => true, :limit => 150
      t.integer  :country_id, :null => true
      t.string  :postal_code, :null => true, :limit => 50
      t.string  :phone1, :null => true, :limit => 50
      t.string  :phone2, :null => true, :limit => 50
      t.string  :email1, :null => true, :limit => 100
      t.string  :email2, :null => true, :limit => 100

      # Is a nested set
      t.integer :parent_id, :null => true, :index => true
      t.integer :lft, :null => false, :index => true
      t.integer :rgt, :null => false, :index => true
      t.integer :depth, :null => false, :default => 0
      t.integer :children_count, :null => false, :default => 0

      t.column :comments, :text
      t.timestamps null: false
    end
    
    add_index(:entities, [:name, :parent_id], :unique => true)
    add_foreign_key(:entities, :countries, :dependent => :restrict)
  end
end
