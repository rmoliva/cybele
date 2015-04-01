class CreateEntities < ActiveRecord::Migration
  def change
    create_table :entities do |t|
      t.string :name,  :limit => 150, :null => false, :index => true
      t.integer :country_id, :null => true
      t.string :label,  :limit => 150, :null => false, :index => true
      t.string :child_label,  :limit => 150, :null => false, :index => true
      t.string :child_labels,  :limit => 150, :null => false, :index => true
      t.boolean :open, :null => false, :default => true

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
