class CreateOrganizations < ActiveRecord::Migration
  class << self
    def up
      create_table :organizations do |t|
        t.string  :name, :null => false, :limit => 250
        t.string  :description, :null => true, :limit => 250
        t.string  :address, :null => true, :limit => 250
        t.string  :city, :null => true, :limit => 150
        t.string  :state, :null => true, :limit => 150
        t.string  :postal_code, :null => true, :limit => 50
        t.string  :phone1, :null => true, :limit => 50
        t.string  :phone2, :null => true, :limit => 50
        t.string  :email, :null => true, :limit => 100
        t.string  :email2, :null => true, :limit => 100
        t.text    :logo
        t.string  :logo_content_type, :limit => 50
        t.timestamps
      end
      add_index :organizations, :name, :unique => true
    end
    
    def down
      drop_table :organizations
    end  
  end    
end
