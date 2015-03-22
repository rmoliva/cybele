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

ActiveRecord::Schema.define(version: 20150322091853) do

  create_table "countries", force: :cascade do |t|
    t.string   "code",       limit: 2
    t.string   "name",       limit: 255
    t.text     "comments",   limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "countries", ["code"], name: "index_countries_on_code", using: :btree
  add_index "countries", ["name"], name: "index_countries_on_name", using: :btree

  create_table "entities", force: :cascade do |t|
    t.string   "name",           limit: 150,               null: false
    t.string   "address",        limit: 250
    t.string   "city",           limit: 150
    t.string   "state",          limit: 150
    t.integer  "country_id",     limit: 4
    t.string   "postal_code",    limit: 50
    t.string   "phone1",         limit: 50
    t.string   "phone2",         limit: 50
    t.string   "email1",         limit: 100
    t.string   "email2",         limit: 100
    t.integer  "parent_id",      limit: 4
    t.integer  "lft",            limit: 4,                 null: false
    t.integer  "rgt",            limit: 4,                 null: false
    t.integer  "depth",          limit: 4,     default: 0, null: false
    t.integer  "children_count", limit: 4,     default: 0, null: false
    t.text     "comments",       limit: 65535
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "entities", ["country_id"], name: "fk_rails_d9fddbe4c8", using: :btree
  add_index "entities", ["lft"], name: "index_entities_on_lft", using: :btree
  add_index "entities", ["name"], name: "index_entities_on_name", using: :btree
  add_index "entities", ["parent_id"], name: "index_entities_on_parent_id", using: :btree
  add_index "entities", ["rgt"], name: "index_entities_on_rgt", using: :btree

  create_table "role_permissions", force: :cascade do |t|
    t.integer  "role_id",    limit: 4,  null: false
    t.string   "app",        limit: 20, null: false
    t.string   "klass",      limit: 50, null: false
    t.string   "action",     limit: 50, null: false
    t.integer  "value",      limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "role_permissions", ["app", "klass", "action"], name: "index_role_permissions_on_app_and_klass_and_action", using: :btree
  add_index "role_permissions", ["app"], name: "index_role_permissions_on_app", using: :btree
  add_index "role_permissions", ["role_id", "app", "klass", "action"], name: "index_role_permissions_on_role_id_and_app_and_klass_and_action", unique: true, using: :btree

  create_table "role_users", force: :cascade do |t|
    t.integer  "user_id",     limit: 4,  null: false
    t.integer  "role_id",     limit: 4,  null: false
    t.string   "entity_type", limit: 20
    t.integer  "entity_id",   limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "role_users", ["role_id"], name: "fk_rails_d517f3214f", using: :btree
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
    t.integer  "tag_id",        limit: 4
    t.integer  "taggable_id",   limit: 4
    t.string   "taggable_type", limit: 255
    t.integer  "tagger_id",     limit: 4
    t.string   "tagger_type",   limit: 255
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name",           limit: 255
    t.integer "taggings_count", limit: 4,   default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",               limit: 150,                 null: false
    t.string   "surname",            limit: 250,                 null: false
    t.string   "gender",             limit: 10,                  null: false
    t.boolean  "active",             limit: 1,    default: true, null: false
    t.string   "email",              limit: 255,                 null: false
    t.string   "crypted_password",   limit: 255,                 null: false
    t.string   "password_salt",      limit: 255,                 null: false
    t.string   "persistence_token",  limit: 255,                 null: false
    t.string   "perishable_token",   limit: 255,                 null: false
    t.integer  "login_count",        limit: 4,    default: 0,    null: false
    t.integer  "failed_login_count", limit: 4,    default: 0,    null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip",   limit: 255
    t.string   "last_login_ip",      limit: 255
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
    t.string   "item_type",  limit: 255,   null: false
    t.integer  "item_id",    limit: 4,     null: false
    t.string   "event",      limit: 255,   null: false
    t.string   "whodunnit",  limit: 255
    t.text     "object",     limit: 65535
    t.datetime "created_at"
  end

  add_index "versions", ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree

  add_foreign_key "entities", "countries"
  add_foreign_key "role_permissions", "roles"
  add_foreign_key "role_users", "roles"
  add_foreign_key "role_users", "users"
end
