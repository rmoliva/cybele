class Entity < ActiveRecord::Base
  has_paper_trail
  include ::EntityTpl
  acts_as_nested_set 

  # Relations
  
  belongs_to :country

  # Validations
  validates_presence_of :name, :country_id
  validates_length_of :name, :maximum=>150

  validates_length_of :address, :maximum=>250, :allow_blank => true
  validates_length_of :city, :maximum=>150, :allow_blank => true
  validates_length_of :state, :maximum=>150, :allow_blank => true
  validates_length_of :postal_code, :maximum=>50, :allow_blank => true
  validates_length_of :phone1, :maximum=>50, :allow_blank => true
  validates_length_of :phone2, :maximum=>50, :allow_blank => true
  validates_length_of :email1, :maximum=>100, :allow_blank => true
  validates_format_of :email1, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :allow_blank=> true
  validates_length_of :email2, :maximum=>100, :allow_blank => true
  validates_format_of :email2, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :allow_blank=> true

  validates_uniqueness_of :name, :scope => :parent_id

  # Delegations

  # Callbacks

  # Scopes
end
