
class Organization < ActiveRecord::Base

  has_paper_trail 
  include ::OrganizationTpl

  # Relations
  # has_many :organization_users
  # has_many :users, :through => :organization_users
  # has_many :organization_products
  # has_many :products, :through => :organization_products
  # has_many :teachers, :conditions => {:type => 'User::Teacher'}, :class_name =>  'User::Teacher', :through => :organization_users, :source => 'user'
# 
  # has_many :stages
  # has_many :courses
  # has_many :groups
  # has_many :subjects

  # Attributes

  # Validations

  validates_presence_of :name
  validates_length_of :name, :maximum=>250
  validates_length_of :description, :maximum=>250, :allow_blank => true

  validates_length_of :address, :maximum=>250, :allow_blank => true
  validates_length_of :city, :maximum=>150, :allow_blank => true
  validates_length_of :state, :maximum=>150, :allow_blank => true
  validates_length_of :postal_code, :maximum=>50, :allow_blank => true
  validates_length_of :phone1, :maximum=>50, :allow_blank => true
  validates_length_of :phone2, :maximum=>50, :allow_blank => true
  validates_length_of :email, :maximum=>100, :allow_blank => true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :allow_blank=> true
  validates_length_of :email2, :maximum=>100, :allow_blank => true
  validates_format_of :email2, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :allow_blank=> true

  # Delegations

  # Callbacks

  # Scopes
  class << self
  end
  
  def self.permission_scope
    :organization
  end
  
end
