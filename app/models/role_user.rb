
class RoleUser < ActiveRecord::Base
  has_paper_trail
  include ::RoleUserTpl
  
  # Relations

  belongs_to :user
  belongs_to :role

  # Attributes

  #attr_accessible :user_id, :network_id

  # Validations

  validates_presence_of :user_id, :role_id
  validates_uniqueness_of :user_id, :scope => [:role_id]

  # Delegations
  delegate :complete_name, :to => :user, :prefix => true, :allow_nil => false
  delegate :app, :to => :role, :prefix => true, :allow_nil => false
  delegate :name, :to => :role, :prefix => true, :allow_nil => false
  delegate :entity_id, :to => :role, :prefix => true, :allow_nil => true
  delegate :entity_type, :to => :role, :prefix => true, :allow_nil => true

  # Callbacks

  # Scopes


  class << self
    def with_role(role)
      where(:role_id => role)
    end

    def with_user(user)
      where(:user_id => user)
    end
    
    def with_entity_type(entity_type)
      where(:entity_type => entity_type)
    end
    
    def with_entity_id(entity_id)
      where(:entity_id => entity_id)
    end
    
    def with_network(entity_id)
      with_entity_type("Network").with_entity_id(entity_id)
    end
    
    def with_organization(entity_id)
      with_entity_type("Organization").with_entity_id(entity_id)
    end
  end
  
  def self.permission_scope
    :role_user
  end
  
end
