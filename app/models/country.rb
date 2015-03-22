class Country < ActiveRecord::Base
  has_paper_trail
  include ::CountryTpl

  # Relations
  
     # has_many :people

  # Validations
  validates_presence_of(:code, :name)
  validates_uniqueness_of(:code)
  validates_uniqueness_of(:name)

  validates_length_of(:code, maximum: 2)
  validates_length_of(:name, maximum: 250)

  # Delegations

  # Callbacks

  # Scopes
  

end
