class Role < ActiveRecord::Base
  has_paper_trail
  include ::RoleTpl
  
  # Relations
  has_many :role_permissions, :dependent => :destroy
  has_many :role_users
  has_many :users, :through => :role_users 
  
  
  # Attributes
  assignable_values_for :app do
    ApplicationContext.apps
  end

  # Validations

  validates_presence_of :name
  validates_length_of :name, maximum: 250
  validates_presence_of :app
  validates_length_of :app, maximum: 20
  validates_length_of :description, maximum: 250
  validates_uniqueness_of :name, scope: [:app]

  # Delegations

  # Callbacks

  # Scopes
  class << self
    def with_app(app)
      where(:app => app)
    end
    
    # Definir dinamicamente los scopes en base a las posibles
    # aplicaciones que haya
    ApplicationContext.apps.each do |app|
      define_method app do
        with_app(app)
      end      
    end
  end
end
