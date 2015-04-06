# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150401102321) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "containers", force: :cascade do |t|
    t.integer  "entity_id",                                                   null: false
    t.string   "name",                                                        null: false
    t.string   "string0"
    t.integer  "integer0"
    t.boolean  "boolean0",                                    default: false, null: false
    t.datetime "datetime0"
    t.string   "relation0_type"
    t.integer  "relation0_id"
    t.decimal  "big_decimal0",       precision: 12, scale: 4
    t.string   "string1"
    t.integer  "integer1"
    t.boolean  "boolean1",                                    default: false, null: false
    t.datetime "datetime1"
    t.string   "relation1_type"
    t.integer  "relation1_id"
    t.decimal  "big_decimal1",       precision: 12, scale: 4
    t.string   "string2"
    t.integer  "integer2"
    t.boolean  "boolean2",                                    default: false, null: false
    t.datetime "datetime2"
    t.string   "relation2_type"
    t.integer  "relation2_id"
    t.decimal  "big_decimal2",       precision: 12, scale: 4
    t.string   "string3"
    t.integer  "integer3"
    t.boolean  "boolean3",                                    default: false, null: false
    t.datetime "datetime3"
    t.string   "relation3_type"
    t.integer  "relation3_id"
    t.decimal  "big_decimal3",       precision: 12, scale: 4
    t.string   "string4"
    t.integer  "integer4"
    t.boolean  "boolean4",                                    default: false, null: false
    t.datetime "datetime4"
    t.string   "relation4_type"
    t.integer  "relation4_id"
    t.decimal  "big_decimal4",       precision: 12, scale: 4
    t.string   "string5"
    t.integer  "integer5"
    t.boolean  "boolean5",                                    default: false, null: false
    t.datetime "datetime5"
    t.string   "relation5_type"
    t.integer  "relation5_id"
    t.decimal  "big_decimal5",       precision: 12, scale: 4
    t.string   "string6"
    t.integer  "integer6"
    t.boolean  "boolean6",                                    default: false, null: false
    t.datetime "datetime6"
    t.string   "relation6_type"
    t.integer  "relation6_id"
    t.decimal  "big_decimal6",       precision: 12, scale: 4
    t.string   "string7"
    t.integer  "integer7"
    t.boolean  "boolean7",                                    default: false, null: false
    t.datetime "datetime7"
    t.string   "relation7_type"
    t.integer  "relation7_id"
    t.decimal  "big_decimal7",       precision: 12, scale: 4
    t.string   "string8"
    t.integer  "integer8"
    t.boolean  "boolean8",                                    default: false, null: false
    t.datetime "datetime8"
    t.string   "relation8_type"
    t.integer  "relation8_id"
    t.decimal  "big_decimal8",       precision: 12, scale: 4
    t.string   "string9"
    t.integer  "integer9"
    t.boolean  "boolean9",                                    default: false, null: false
    t.datetime "datetime9"
    t.string   "relation9_type"
    t.integer  "relation9_id"
    t.decimal  "big_decimal9",       precision: 12, scale: 4
    t.string   "string10"
    t.integer  "integer10"
    t.boolean  "boolean10",                                   default: false, null: false
    t.datetime "datetime10"
    t.string   "relation10_type"
    t.integer  "relation10_id"
    t.decimal  "big_decimal10",      precision: 12, scale: 4
    t.string   "string11"
    t.integer  "integer11"
    t.boolean  "boolean11",                                   default: false, null: false
    t.datetime "datetime11"
    t.string   "relation11_type"
    t.integer  "relation11_id"
    t.decimal  "big_decimal11",      precision: 12, scale: 4
    t.string   "string12"
    t.integer  "integer12"
    t.boolean  "boolean12",                                   default: false, null: false
    t.datetime "datetime12"
    t.string   "relation12_type"
    t.integer  "relation12_id"
    t.decimal  "big_decimal12",      precision: 12, scale: 4
    t.string   "string13"
    t.integer  "integer13"
    t.boolean  "boolean13",                                   default: false, null: false
    t.datetime "datetime13"
    t.string   "relation13_type"
    t.integer  "relation13_id"
    t.decimal  "big_decimal13",      precision: 12, scale: 4
    t.string   "string14"
    t.integer  "integer14"
    t.boolean  "boolean14",                                   default: false, null: false
    t.datetime "datetime14"
    t.string   "relation14_type"
    t.integer  "relation14_id"
    t.decimal  "big_decimal14",      precision: 12, scale: 4
    t.string   "string15"
    t.integer  "integer15"
    t.boolean  "boolean15",                                   default: false, null: false
    t.datetime "datetime15"
    t.string   "relation15_type"
    t.integer  "relation15_id"
    t.decimal  "big_decimal15",      precision: 12, scale: 4
    t.string   "string16"
    t.integer  "integer16"
    t.boolean  "boolean16",                                   default: false, null: false
    t.datetime "datetime16"
    t.string   "relation16_type"
    t.integer  "relation16_id"
    t.decimal  "big_decimal16",      precision: 12, scale: 4
    t.string   "string17"
    t.integer  "integer17"
    t.boolean  "boolean17",                                   default: false, null: false
    t.datetime "datetime17"
    t.string   "relation17_type"
    t.integer  "relation17_id"
    t.decimal  "big_decimal17",      precision: 12, scale: 4
    t.string   "string18"
    t.integer  "integer18"
    t.boolean  "boolean18",                                   default: false, null: false
    t.datetime "datetime18"
    t.string   "relation18_type"
    t.integer  "relation18_id"
    t.decimal  "big_decimal18",      precision: 12, scale: 4
    t.string   "string19"
    t.integer  "integer19"
    t.boolean  "boolean19",                                   default: false, null: false
    t.datetime "datetime19"
    t.string   "relation19_type"
    t.integer  "relation19_id"
    t.decimal  "big_decimal19",      precision: 12, scale: 4
    t.string   "string20"
    t.integer  "integer20"
    t.boolean  "boolean20",                                   default: false, null: false
    t.datetime "datetime20"
    t.string   "relation20_type"
    t.integer  "relation20_id"
    t.decimal  "big_decimal20",      precision: 12, scale: 4
    t.string   "string21"
    t.integer  "integer21"
    t.boolean  "boolean21",                                   default: false, null: false
    t.datetime "datetime21"
    t.string   "relation21_type"
    t.integer  "relation21_id"
    t.decimal  "big_decimal21",      precision: 12, scale: 4
    t.string   "string22"
    t.integer  "integer22"
    t.boolean  "boolean22",                                   default: false, null: false
    t.datetime "datetime22"
    t.string   "relation22_type"
    t.integer  "relation22_id"
    t.decimal  "big_decimal22",      precision: 12, scale: 4
    t.string   "string23"
    t.integer  "integer23"
    t.boolean  "boolean23",                                   default: false, null: false
    t.datetime "datetime23"
    t.string   "relation23_type"
    t.integer  "relation23_id"
    t.decimal  "big_decimal23",      precision: 12, scale: 4
    t.string   "string24"
    t.integer  "integer24"
    t.boolean  "boolean24",                                   default: false, null: false
    t.datetime "datetime24"
    t.string   "relation24_type"
    t.integer  "relation24_id"
    t.decimal  "big_decimal24",      precision: 12, scale: 4
    t.string   "string25"
    t.integer  "integer25"
    t.boolean  "boolean25",                                   default: false, null: false
    t.datetime "datetime25"
    t.string   "relation25_type"
    t.integer  "relation25_id"
    t.decimal  "big_decimal25",      precision: 12, scale: 4
    t.string   "string26"
    t.integer  "integer26"
    t.boolean  "boolean26",                                   default: false, null: false
    t.datetime "datetime26"
    t.string   "relation26_type"
    t.integer  "relation26_id"
    t.decimal  "big_decimal26",      precision: 12, scale: 4
    t.string   "string27"
    t.integer  "integer27"
    t.boolean  "boolean27",                                   default: false, null: false
    t.datetime "datetime27"
    t.string   "relation27_type"
    t.integer  "relation27_id"
    t.decimal  "big_decimal27",      precision: 12, scale: 4
    t.string   "string28"
    t.integer  "integer28"
    t.boolean  "boolean28",                                   default: false, null: false
    t.datetime "datetime28"
    t.string   "relation28_type"
    t.integer  "relation28_id"
    t.decimal  "big_decimal28",      precision: 12, scale: 4
    t.string   "string29"
    t.integer  "integer29"
    t.boolean  "boolean29",                                   default: false, null: false
    t.datetime "datetime29"
    t.string   "relation29_type"
    t.integer  "relation29_id"
    t.decimal  "big_decimal29",      precision: 12, scale: 4
    t.text     "coments"
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "containers", ["big_decimal0"], name: "index_containers_on_big_decimal0", using: :btree
  add_index "containers", ["big_decimal1"], name: "index_containers_on_big_decimal1", using: :btree
  add_index "containers", ["big_decimal10"], name: "index_containers_on_big_decimal10", using: :btree
  add_index "containers", ["big_decimal11"], name: "index_containers_on_big_decimal11", using: :btree
  add_index "containers", ["big_decimal12"], name: "index_containers_on_big_decimal12", using: :btree
  add_index "containers", ["big_decimal13"], name: "index_containers_on_big_decimal13", using: :btree
  add_index "containers", ["big_decimal14"], name: "index_containers_on_big_decimal14", using: :btree
  add_index "containers", ["big_decimal15"], name: "index_containers_on_big_decimal15", using: :btree
  add_index "containers", ["big_decimal16"], name: "index_containers_on_big_decimal16", using: :btree
  add_index "containers", ["big_decimal17"], name: "index_containers_on_big_decimal17", using: :btree
  add_index "containers", ["big_decimal18"], name: "index_containers_on_big_decimal18", using: :btree
  add_index "containers", ["big_decimal19"], name: "index_containers_on_big_decimal19", using: :btree
  add_index "containers", ["big_decimal2"], name: "index_containers_on_big_decimal2", using: :btree
  add_index "containers", ["big_decimal20"], name: "index_containers_on_big_decimal20", using: :btree
  add_index "containers", ["big_decimal21"], name: "index_containers_on_big_decimal21", using: :btree
  add_index "containers", ["big_decimal22"], name: "index_containers_on_big_decimal22", using: :btree
  add_index "containers", ["big_decimal23"], name: "index_containers_on_big_decimal23", using: :btree
  add_index "containers", ["big_decimal24"], name: "index_containers_on_big_decimal24", using: :btree
  add_index "containers", ["big_decimal25"], name: "index_containers_on_big_decimal25", using: :btree
  add_index "containers", ["big_decimal26"], name: "index_containers_on_big_decimal26", using: :btree
  add_index "containers", ["big_decimal27"], name: "index_containers_on_big_decimal27", using: :btree
  add_index "containers", ["big_decimal28"], name: "index_containers_on_big_decimal28", using: :btree
  add_index "containers", ["big_decimal29"], name: "index_containers_on_big_decimal29", using: :btree
  add_index "containers", ["big_decimal3"], name: "index_containers_on_big_decimal3", using: :btree
  add_index "containers", ["big_decimal4"], name: "index_containers_on_big_decimal4", using: :btree
  add_index "containers", ["big_decimal5"], name: "index_containers_on_big_decimal5", using: :btree
  add_index "containers", ["big_decimal6"], name: "index_containers_on_big_decimal6", using: :btree
  add_index "containers", ["big_decimal7"], name: "index_containers_on_big_decimal7", using: :btree
  add_index "containers", ["big_decimal8"], name: "index_containers_on_big_decimal8", using: :btree
  add_index "containers", ["big_decimal9"], name: "index_containers_on_big_decimal9", using: :btree
  add_index "containers", ["boolean0"], name: "index_containers_on_boolean0", using: :btree
  add_index "containers", ["boolean1"], name: "index_containers_on_boolean1", using: :btree
  add_index "containers", ["boolean10"], name: "index_containers_on_boolean10", using: :btree
  add_index "containers", ["boolean11"], name: "index_containers_on_boolean11", using: :btree
  add_index "containers", ["boolean12"], name: "index_containers_on_boolean12", using: :btree
  add_index "containers", ["boolean13"], name: "index_containers_on_boolean13", using: :btree
  add_index "containers", ["boolean14"], name: "index_containers_on_boolean14", using: :btree
  add_index "containers", ["boolean15"], name: "index_containers_on_boolean15", using: :btree
  add_index "containers", ["boolean16"], name: "index_containers_on_boolean16", using: :btree
  add_index "containers", ["boolean17"], name: "index_containers_on_boolean17", using: :btree
  add_index "containers", ["boolean18"], name: "index_containers_on_boolean18", using: :btree
  add_index "containers", ["boolean19"], name: "index_containers_on_boolean19", using: :btree
  add_index "containers", ["boolean2"], name: "index_containers_on_boolean2", using: :btree
  add_index "containers", ["boolean20"], name: "index_containers_on_boolean20", using: :btree
  add_index "containers", ["boolean21"], name: "index_containers_on_boolean21", using: :btree
  add_index "containers", ["boolean22"], name: "index_containers_on_boolean22", using: :btree
  add_index "containers", ["boolean23"], name: "index_containers_on_boolean23", using: :btree
  add_index "containers", ["boolean24"], name: "index_containers_on_boolean24", using: :btree
  add_index "containers", ["boolean25"], name: "index_containers_on_boolean25", using: :btree
  add_index "containers", ["boolean26"], name: "index_containers_on_boolean26", using: :btree
  add_index "containers", ["boolean27"], name: "index_containers_on_boolean27", using: :btree
  add_index "containers", ["boolean28"], name: "index_containers_on_boolean28", using: :btree
  add_index "containers", ["boolean29"], name: "index_containers_on_boolean29", using: :btree
  add_index "containers", ["boolean3"], name: "index_containers_on_boolean3", using: :btree
  add_index "containers", ["boolean4"], name: "index_containers_on_boolean4", using: :btree
  add_index "containers", ["boolean5"], name: "index_containers_on_boolean5", using: :btree
  add_index "containers", ["boolean6"], name: "index_containers_on_boolean6", using: :btree
  add_index "containers", ["boolean7"], name: "index_containers_on_boolean7", using: :btree
  add_index "containers", ["boolean8"], name: "index_containers_on_boolean8", using: :btree
  add_index "containers", ["boolean9"], name: "index_containers_on_boolean9", using: :btree
  add_index "containers", ["datetime0"], name: "index_containers_on_datetime0", using: :btree
  add_index "containers", ["datetime1"], name: "index_containers_on_datetime1", using: :btree
  add_index "containers", ["datetime10"], name: "index_containers_on_datetime10", using: :btree
  add_index "containers", ["datetime11"], name: "index_containers_on_datetime11", using: :btree
  add_index "containers", ["datetime12"], name: "index_containers_on_datetime12", using: :btree
  add_index "containers", ["datetime13"], name: "index_containers_on_datetime13", using: :btree
  add_index "containers", ["datetime14"], name: "index_containers_on_datetime14", using: :btree
  add_index "containers", ["datetime15"], name: "index_containers_on_datetime15", using: :btree
  add_index "containers", ["datetime16"], name: "index_containers_on_datetime16", using: :btree
  add_index "containers", ["datetime17"], name: "index_containers_on_datetime17", using: :btree
  add_index "containers", ["datetime18"], name: "index_containers_on_datetime18", using: :btree
  add_index "containers", ["datetime19"], name: "index_containers_on_datetime19", using: :btree
  add_index "containers", ["datetime2"], name: "index_containers_on_datetime2", using: :btree
  add_index "containers", ["datetime20"], name: "index_containers_on_datetime20", using: :btree
  add_index "containers", ["datetime21"], name: "index_containers_on_datetime21", using: :btree
  add_index "containers", ["datetime22"], name: "index_containers_on_datetime22", using: :btree
  add_index "containers", ["datetime23"], name: "index_containers_on_datetime23", using: :btree
  add_index "containers", ["datetime24"], name: "index_containers_on_datetime24", using: :btree
  add_index "containers", ["datetime25"], name: "index_containers_on_datetime25", using: :btree
  add_index "containers", ["datetime26"], name: "index_containers_on_datetime26", using: :btree
  add_index "containers", ["datetime27"], name: "index_containers_on_datetime27", using: :btree
  add_index "containers", ["datetime28"], name: "index_containers_on_datetime28", using: :btree
  add_index "containers", ["datetime29"], name: "index_containers_on_datetime29", using: :btree
  add_index "containers", ["datetime3"], name: "index_containers_on_datetime3", using: :btree
  add_index "containers", ["datetime4"], name: "index_containers_on_datetime4", using: :btree
  add_index "containers", ["datetime5"], name: "index_containers_on_datetime5", using: :btree
  add_index "containers", ["datetime6"], name: "index_containers_on_datetime6", using: :btree
  add_index "containers", ["datetime7"], name: "index_containers_on_datetime7", using: :btree
  add_index "containers", ["datetime8"], name: "index_containers_on_datetime8", using: :btree
  add_index "containers", ["datetime9"], name: "index_containers_on_datetime9", using: :btree
  add_index "containers", ["entity_id", "name"], name: "index_containers_on_entity_id_and_name", using: :btree
  add_index "containers", ["integer0"], name: "index_containers_on_integer0", using: :btree
  add_index "containers", ["integer1"], name: "index_containers_on_integer1", using: :btree
  add_index "containers", ["integer10"], name: "index_containers_on_integer10", using: :btree
  add_index "containers", ["integer11"], name: "index_containers_on_integer11", using: :btree
  add_index "containers", ["integer12"], name: "index_containers_on_integer12", using: :btree
  add_index "containers", ["integer13"], name: "index_containers_on_integer13", using: :btree
  add_index "containers", ["integer14"], name: "index_containers_on_integer14", using: :btree
  add_index "containers", ["integer15"], name: "index_containers_on_integer15", using: :btree
  add_index "containers", ["integer16"], name: "index_containers_on_integer16", using: :btree
  add_index "containers", ["integer17"], name: "index_containers_on_integer17", using: :btree
  add_index "containers", ["integer18"], name: "index_containers_on_integer18", using: :btree
  add_index "containers", ["integer19"], name: "index_containers_on_integer19", using: :btree
  add_index "containers", ["integer2"], name: "index_containers_on_integer2", using: :btree
  add_index "containers", ["integer20"], name: "index_containers_on_integer20", using: :btree
  add_index "containers", ["integer21"], name: "index_containers_on_integer21", using: :btree
  add_index "containers", ["integer22"], name: "index_containers_on_integer22", using: :btree
  add_index "containers", ["integer23"], name: "index_containers_on_integer23", using: :btree
  add_index "containers", ["integer24"], name: "index_containers_on_integer24", using: :btree
  add_index "containers", ["integer25"], name: "index_containers_on_integer25", using: :btree
  add_index "containers", ["integer26"], name: "index_containers_on_integer26", using: :btree
  add_index "containers", ["integer27"], name: "index_containers_on_integer27", using: :btree
  add_index "containers", ["integer28"], name: "index_containers_on_integer28", using: :btree
  add_index "containers", ["integer29"], name: "index_containers_on_integer29", using: :btree
  add_index "containers", ["integer3"], name: "index_containers_on_integer3", using: :btree
  add_index "containers", ["integer4"], name: "index_containers_on_integer4", using: :btree
  add_index "containers", ["integer5"], name: "index_containers_on_integer5", using: :btree
  add_index "containers", ["integer6"], name: "index_containers_on_integer6", using: :btree
  add_index "containers", ["integer7"], name: "index_containers_on_integer7", using: :btree
  add_index "containers", ["integer8"], name: "index_containers_on_integer8", using: :btree
  add_index "containers", ["integer9"], name: "index_containers_on_integer9", using: :btree
  add_index "containers", ["relation0_id"], name: "index_containers_on_relation0_id", using: :btree
  add_index "containers", ["relation0_type"], name: "index_containers_on_relation0_type", using: :btree
  add_index "containers", ["relation10_id"], name: "index_containers_on_relation10_id", using: :btree
  add_index "containers", ["relation10_type"], name: "index_containers_on_relation10_type", using: :btree
  add_index "containers", ["relation11_id"], name: "index_containers_on_relation11_id", using: :btree
  add_index "containers", ["relation11_type"], name: "index_containers_on_relation11_type", using: :btree
  add_index "containers", ["relation12_id"], name: "index_containers_on_relation12_id", using: :btree
  add_index "containers", ["relation12_type"], name: "index_containers_on_relation12_type", using: :btree
  add_index "containers", ["relation13_id"], name: "index_containers_on_relation13_id", using: :btree
  add_index "containers", ["relation13_type"], name: "index_containers_on_relation13_type", using: :btree
  add_index "containers", ["relation14_id"], name: "index_containers_on_relation14_id", using: :btree
  add_index "containers", ["relation14_type"], name: "index_containers_on_relation14_type", using: :btree
  add_index "containers", ["relation15_id"], name: "index_containers_on_relation15_id", using: :btree
  add_index "containers", ["relation15_type"], name: "index_containers_on_relation15_type", using: :btree
  add_index "containers", ["relation16_id"], name: "index_containers_on_relation16_id", using: :btree
  add_index "containers", ["relation16_type"], name: "index_containers_on_relation16_type", using: :btree
  add_index "containers", ["relation17_id"], name: "index_containers_on_relation17_id", using: :btree
  add_index "containers", ["relation17_type"], name: "index_containers_on_relation17_type", using: :btree
  add_index "containers", ["relation18_id"], name: "index_containers_on_relation18_id", using: :btree
  add_index "containers", ["relation18_type"], name: "index_containers_on_relation18_type", using: :btree
  add_index "containers", ["relation19_id"], name: "index_containers_on_relation19_id", using: :btree
  add_index "containers", ["relation19_type"], name: "index_containers_on_relation19_type", using: :btree
  add_index "containers", ["relation1_id"], name: "index_containers_on_relation1_id", using: :btree
  add_index "containers", ["relation1_type"], name: "index_containers_on_relation1_type", using: :btree
  add_index "containers", ["relation20_id"], name: "index_containers_on_relation20_id", using: :btree
  add_index "containers", ["relation20_type"], name: "index_containers_on_relation20_type", using: :btree
  add_index "containers", ["relation21_id"], name: "index_containers_on_relation21_id", using: :btree
  add_index "containers", ["relation21_type"], name: "index_containers_on_relation21_type", using: :btree
  add_index "containers", ["relation22_id"], name: "index_containers_on_relation22_id", using: :btree
  add_index "containers", ["relation22_type"], name: "index_containers_on_relation22_type", using: :btree
  add_index "containers", ["relation23_id"], name: "index_containers_on_relation23_id", using: :btree
  add_index "containers", ["relation23_type"], name: "index_containers_on_relation23_type", using: :btree
  add_index "containers", ["relation24_id"], name: "index_containers_on_relation24_id", using: :btree
  add_index "containers", ["relation24_type"], name: "index_containers_on_relation24_type", using: :btree
  add_index "containers", ["relation25_id"], name: "index_containers_on_relation25_id", using: :btree
  add_index "containers", ["relation25_type"], name: "index_containers_on_relation25_type", using: :btree
  add_index "containers", ["relation26_id"], name: "index_containers_on_relation26_id", using: :btree
  add_index "containers", ["relation26_type"], name: "index_containers_on_relation26_type", using: :btree
  add_index "containers", ["relation27_id"], name: "index_containers_on_relation27_id", using: :btree
  add_index "containers", ["relation27_type"], name: "index_containers_on_relation27_type", using: :btree
  add_index "containers", ["relation28_id"], name: "index_containers_on_relation28_id", using: :btree
  add_index "containers", ["relation28_type"], name: "index_containers_on_relation28_type", using: :btree
  add_index "containers", ["relation29_id"], name: "index_containers_on_relation29_id", using: :btree
  add_index "containers", ["relation29_type"], name: "index_containers_on_relation29_type", using: :btree
  add_index "containers", ["relation2_id"], name: "index_containers_on_relation2_id", using: :btree
  add_index "containers", ["relation2_type"], name: "index_containers_on_relation2_type", using: :btree
  add_index "containers", ["relation3_id"], name: "index_containers_on_relation3_id", using: :btree
  add_index "containers", ["relation3_type"], name: "index_containers_on_relation3_type", using: :btree
  add_index "containers", ["relation4_id"], name: "index_containers_on_relation4_id", using: :btree
  add_index "containers", ["relation4_type"], name: "index_containers_on_relation4_type", using: :btree
  add_index "containers", ["relation5_id"], name: "index_containers_on_relation5_id", using: :btree
  add_index "containers", ["relation5_type"], name: "index_containers_on_relation5_type", using: :btree
  add_index "containers", ["relation6_id"], name: "index_containers_on_relation6_id", using: :btree
  add_index "containers", ["relation6_type"], name: "index_containers_on_relation6_type", using: :btree
  add_index "containers", ["relation7_id"], name: "index_containers_on_relation7_id", using: :btree
  add_index "containers", ["relation7_type"], name: "index_containers_on_relation7_type", using: :btree
  add_index "containers", ["relation8_id"], name: "index_containers_on_relation8_id", using: :btree
  add_index "containers", ["relation8_type"], name: "index_containers_on_relation8_type", using: :btree
  add_index "containers", ["relation9_id"], name: "index_containers_on_relation9_id", using: :btree
  add_index "containers", ["relation9_type"], name: "index_containers_on_relation9_type", using: :btree
  add_index "containers", ["string0"], name: "index_containers_on_string0", using: :btree
  add_index "containers", ["string1"], name: "index_containers_on_string1", using: :btree
  add_index "containers", ["string10"], name: "index_containers_on_string10", using: :btree
  add_index "containers", ["string11"], name: "index_containers_on_string11", using: :btree
  add_index "containers", ["string12"], name: "index_containers_on_string12", using: :btree
  add_index "containers", ["string13"], name: "index_containers_on_string13", using: :btree
  add_index "containers", ["string14"], name: "index_containers_on_string14", using: :btree
  add_index "containers", ["string15"], name: "index_containers_on_string15", using: :btree
  add_index "containers", ["string16"], name: "index_containers_on_string16", using: :btree
  add_index "containers", ["string17"], name: "index_containers_on_string17", using: :btree
  add_index "containers", ["string18"], name: "index_containers_on_string18", using: :btree
  add_index "containers", ["string19"], name: "index_containers_on_string19", using: :btree
  add_index "containers", ["string2"], name: "index_containers_on_string2", using: :btree
  add_index "containers", ["string20"], name: "index_containers_on_string20", using: :btree
  add_index "containers", ["string21"], name: "index_containers_on_string21", using: :btree
  add_index "containers", ["string22"], name: "index_containers_on_string22", using: :btree
  add_index "containers", ["string23"], name: "index_containers_on_string23", using: :btree
  add_index "containers", ["string24"], name: "index_containers_on_string24", using: :btree
  add_index "containers", ["string25"], name: "index_containers_on_string25", using: :btree
  add_index "containers", ["string26"], name: "index_containers_on_string26", using: :btree
  add_index "containers", ["string27"], name: "index_containers_on_string27", using: :btree
  add_index "containers", ["string28"], name: "index_containers_on_string28", using: :btree
  add_index "containers", ["string29"], name: "index_containers_on_string29", using: :btree
  add_index "containers", ["string3"], name: "index_containers_on_string3", using: :btree
  add_index "containers", ["string4"], name: "index_containers_on_string4", using: :btree
  add_index "containers", ["string5"], name: "index_containers_on_string5", using: :btree
  add_index "containers", ["string6"], name: "index_containers_on_string6", using: :btree
  add_index "containers", ["string7"], name: "index_containers_on_string7", using: :btree
  add_index "containers", ["string8"], name: "index_containers_on_string8", using: :btree
  add_index "containers", ["string9"], name: "index_containers_on_string9", using: :btree

  create_table "countries", force: :cascade do |t|
    t.string   "code",       limit: 2
    t.string   "name"
    t.text     "comments"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "countries", ["code"], name: "index_countries_on_code", using: :btree
  add_index "countries", ["name"], name: "index_countries_on_name", using: :btree

  create_table "entities", force: :cascade do |t|
    t.string   "name",           limit: 150,                null: false
    t.integer  "country_id"
    t.string   "label",          limit: 150,                null: false
    t.string   "child_label",    limit: 150,                null: false
    t.string   "child_labels",   limit: 150,                null: false
    t.boolean  "open",                       default: true, null: false
    t.integer  "parent_id"
    t.integer  "lft",                                       null: false
    t.integer  "rgt",                                       null: false
    t.integer  "depth",                      default: 0,    null: false
    t.integer  "children_count",             default: 0,    null: false
    t.text     "comments"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "entities", ["child_label"], name: "index_entities_on_child_label", using: :btree
  add_index "entities", ["child_labels"], name: "index_entities_on_child_labels", using: :btree
  add_index "entities", ["label"], name: "index_entities_on_label", using: :btree
  add_index "entities", ["lft"], name: "index_entities_on_lft", using: :btree
  add_index "entities", ["name", "parent_id"], name: "index_entities_on_name_and_parent_id", unique: true, using: :btree
  add_index "entities", ["name"], name: "index_entities_on_name", using: :btree
  add_index "entities", ["parent_id"], name: "index_entities_on_parent_id", using: :btree
  add_index "entities", ["rgt"], name: "index_entities_on_rgt", using: :btree

  create_table "role_permissions", force: :cascade do |t|
    t.integer  "role_id",               null: false
    t.string   "app",        limit: 20, null: false
    t.string   "klass",      limit: 50, null: false
    t.string   "action",     limit: 50, null: false
    t.integer  "value"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "role_permissions", ["app", "klass", "action"], name: "index_role_permissions_on_app_and_klass_and_action", using: :btree
  add_index "role_permissions", ["app"], name: "index_role_permissions_on_app", using: :btree
  add_index "role_permissions", ["role_id", "app", "klass", "action"], name: "index_role_permissions_on_role_id_and_app_and_klass_and_action", unique: true, using: :btree

  create_table "role_users", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.integer  "role_id",                null: false
    t.string   "entity_type", limit: 20
    t.integer  "entity_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "role_users", ["user_id", "role_id"], name: "index_role_users_on_user_id_and_role_id", unique: true, using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "app",         limit: 20,  null: false
    t.string   "name",        limit: 250, null: false
    t.string   "description", limit: 250
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "roles", ["app"], name: "index_roles_on_app", using: :btree
  add_index "roles", ["name", "app"], name: "index_roles_on_name_and_app", unique: true, using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name"
    t.integer "taggings_count", default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",               limit: 150,                 null: false
    t.string   "surname",            limit: 250,                 null: false
    t.string   "gender",             limit: 10,                  null: false
    t.boolean  "active",                          default: true, null: false
    t.string   "email",                                          null: false
    t.string   "crypted_password",                               null: false
    t.string   "password_salt",                                  null: false
    t.string   "persistence_token",                              null: false
    t.string   "perishable_token",                               null: false
    t.integer  "login_count",                     default: 0,    null: false
    t.integer  "failed_login_count",              default: 0,    null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.string   "address",            limit: 1024
    t.string   "city",               limit: 1024
    t.string   "state",              limit: 150
    t.string   "postal_code",        limit: 50
    t.string   "phone1",             limit: 50
    t.string   "phone2",             limit: 50
    t.string   "email2",             limit: 50
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
  end

  add_index "users", ["active"], name: "index_users_on_active", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["gender"], name: "index_users_on_gender", using: :btree
  add_index "users", ["name", "surname"], name: "index_users_on_name_and_surname", using: :btree
  add_index "users", ["perishable_token"], name: "index_users_on_perishable_token", using: :btree
  add_index "users", ["persistence_token"], name: "index_users_on_persistence_token", using: :btree

  create_table "versions", force: :cascade do |t|
    t.string   "item_type",  null: false
    t.integer  "item_id",    null: false
    t.string   "event",      null: false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree

  add_foreign_key "entities", "countries"
  add_foreign_key "role_permissions", "roles"
  add_foreign_key "role_users", "roles"
  add_foreign_key "role_users", "users"
end
