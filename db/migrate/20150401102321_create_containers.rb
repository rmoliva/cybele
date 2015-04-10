class CreateContainers < ActiveRecord::Migration
  def change
    create_table :containers do |t|
      t.integer  :entity_id, null: false
      t.string   :entity_type, null: false
      t.string   :name, null: false
      
      30.times do |index|
        t.string   :"string#{index}", null: true, default: nil, index: true
        t.integer  :"integer#{index}", null: true, default: nil, index: true
        t.boolean  :"boolean#{index}", null: false, default: false, index: true
        t.datetime :"datetime#{index}", null: true, default: nil, index: true
        t.string   :"relation#{index}_type", null: true, default: nil
        t.integer  :"relation#{index}_id", null: true, default: nil
        t.integer  :"relation#{index}_name", null: true, default: nil
        t.decimal  :"big_decimal#{index}", null: true, default: nil, precision: 12, scale: 4, index: true
      end
      t.text :coments
      t.timestamps null: false
    end
    add_attachment :containers, :image
    add_index :containers, [:entity_id, :entity_type, :name]
    30.times do |index|
      add_index :containers, [:"relation#{index}_type", :"relation#{index}_id", :"relation#{index}_name"], :name => "index_cont_on_rel#{index}_type_and_rel#{index}_id_and_rel#{index}_name"
    end
  end
end
