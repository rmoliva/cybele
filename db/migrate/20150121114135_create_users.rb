class CreateUsers < ActiveRecord::Migration
  class << self
    def up
      create_table :users do |t|
        t.string    :name, null: false, limit: 150
        t.string    :surname, null: false, limit: 250
        t.string    :gender, limit: 10, null: false
        t.boolean   :active, null: false, default: true
  
        # Campos de Authlogic -> Acceso
        t.string    :email, null: false
        t.string    :crypted_password, null: false
        t.string    :password_salt, null: false
        t.string    :persistence_token, null: false
        t.string    :perishable_token, null: false 
        t.integer   :login_count,         null: false, default: 0
        t.integer   :failed_login_count,  null: false, default: 0
        t.datetime  :last_request_at
        t.datetime  :current_login_at
        t.datetime  :last_login_at
        t.string    :current_login_ip
        t.string    :last_login_ip
  
        # Datos de domicilio
        t.string    :address, limit: 1024
        t.string    :city, limit: 1024
        t.string    :state, limit: 150
        t.string    :postal_code, limit: 50
        t.string    :phone1, limit: 50
        t.string    :phone2, limit: 50
        t.string    :email2, limit: 50
  
        t.timestamps null: false
      end
      add_index :users, [:name, :surname]
      add_index :users, :email, :unique => true
      add_index :users, :gender
      add_index :users, :active
      add_index :users, :persistence_token
      add_index :users, :perishable_token
      
      # Crear las referencias de tablas anteriores que hayan necesitado esta tabla
  #     add_foreign_key :work_sessions, :users, :dependent => :restrict
  #    add_foreign_key :work_session_values, :users, :dependent => :restrict
    end
    
    def down
      drop_table :users
    end
  end
end
