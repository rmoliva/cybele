class Container < ActiveRecord::Base
  has_paper_trail
  include ::ContainerTpl

  # Relations
  belongs_to :entity

  # Validations
  validates_presence_of :entity_id, :name
  validates_length_of :name, :maximum=>150

  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  # Delegations

  # Callbacks

  # Scopes
  
end
