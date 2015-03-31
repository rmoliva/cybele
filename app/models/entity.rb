class Entity < ActiveRecord::Base
  has_paper_trail
  include ::EntityTpl
  acts_as_nested_set 

  # Relations
  
  belongs_to :country

  # Validations
  validates_presence_of :name, :country_id, :label, :child_label, :child_labels, :open
  validates_length_of :name, :maximum=>150
  validates_length_of :label, :maximum=>150
  validates_length_of :child_label, :maximum=>150
  validates_length_of :child_labels, :maximum=>150

  validates_uniqueness_of :name, :scope => :parent_id

  # Delegations

  # Callbacks

  # Scopes

  # Devolver la propia entidad y un array con los padres   
  def self_and_parents
    p = [self]
    parent = self.parent 
    
    while parent do
      p << parent
      parent = parent.parent 
    end
    p
  end
end
