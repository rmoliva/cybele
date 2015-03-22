class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.column :code, :string, :limit => 2, :index => true, :unique => true
      t.column :name, :string, :index => true, :unique => true
      t.column :comments, :text
      t.timestamps null: false
    end
  end
end
