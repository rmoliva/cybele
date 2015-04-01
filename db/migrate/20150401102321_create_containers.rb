class CreateContainers < ActiveRecord::Migration
  def change
    create_table :containers do |t|
      t.integer  :entity_id, null: false
      t.string   :name, null: false
      
      30.times do |index|
        t.string   :"string#{index}", null: true, default: nil, index: true
        t.integer  :"integer#{index}", null: true, default: nil, index: true
        t.boolean  :"boolean#{index}", null: false, default: false, index: true
        t.datetime :"datetime#{index}", null: true, default: nil, index: true
        t.string   :"relation#{index}_type", null: true, default: nil, index: true
        t.integer  :"relation#{index}_id", null: true, default: nil, index: true
        t.decimal  :"big_decimal#{index}", null: true, default: nil, precision: 12, scale: 4, index: true
      end
      t.timestamps null: false
    end
    add_index :containers, [:entity_id, :name], :unique => true
  end
end
