class RolePermission < ActiveRecord::Base
  has_paper_trail
  include ::RolePermissionTpl
  
  # Relations
  belongs_to :role

  # Attributes
  assignable_values_for :app do
    ApplicationContext.apps
  end

  # Validations

  validates_presence_of :role_id
  validates_presence_of :app
  validates_length_of :app, maximum: 20
  validates_presence_of :klass
  validates_length_of :klass, maximum: 50
  validates_presence_of :action
  validates_length_of :action, maximum: 50
  
  validates_uniqueness_of :action, scope: [:role_id, :app, :klass]

  # Delegations
  delegate :app, :to => :role, :prefix => true, :allow_nil => false
  delegate :entity_id, :to => :role, :prefix => true, :allow_nil => true

  # Callbacks

  # Scopes
  class << self
    def with_role(role)
        where(:role_id => role)
    end  

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
