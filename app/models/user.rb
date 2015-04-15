class User < ActiveRecord::Base
  include ::UserTpl
  
  # Authlogic
  acts_as_authentic do |config|
    config.session_class = UserSession
    config.login_field = :email 
    config.validates_length_of_login_field_options minimum: 4, maximum: 50
  end
  
  # Papertrail
  has_paper_trail ignore:
    [
      :crypted_password,
      :password_salt,
      :perishable_token,
      :persistance_token,
      :login_count,
      :failed_login_count,
      :last_request_at,
      :current_login_at,
      :last_login_at,
      :current_login_ip,
      :last_login_ip,
      :password,
      :password_confirmation
    ]

  # Paperclip
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  
  # Relations
  has_many :role_users
  has_many :roles, :through => :role_users 
     
  # Attributes
  assignable_values_for :gender do
    ["male", "female"]
  end
  assignable_values_for :active do
    [true, false]
  end

  # Validations

  validates_presence_of :email
  validates_uniqueness_of :email

  validates_length_of :name, maximum: 150
  validates_length_of :surname, maximum: 150
  validates_length_of :surname, maximum: 150
  validates_length_of :address, maximum: 1024, allow_blank: true
  validates_length_of :city, maximum: 150, allow_blank: true
  validates_length_of :state, maximum: 150, allow_blank: true
  validates_length_of :postal_code, maximum: 50, allow_blank: true
  validates_length_of :phone1, maximum: 50, allow_blank: true
  validates_length_of :phone2, maximum: 50, allow_blank: true
  validates_length_of :email, maximum: 50, allow_blank: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, allow_blank: true
  validates_length_of :email2, maximum: 50, allow_blank: true
  validates_format_of :email2, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, allow_blank: true

  # Delegations

  # Callbacks

  # Scopes
  
  
end
