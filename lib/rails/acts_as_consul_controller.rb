module ActsAsConsulController
  def self.included(klass)
    
#    klass.before_filter :load_record, only: [:show, :update, :destroy]
    klass.before_action :load_service

    # Parametros configurables
    # power_options
    klass.class_attribute :power_options
    
    # controller_power
    klass.class_attribute :controller_power

    klass.class_eval do
      include Consul::Controller

      # Extender funcionalidad de Clase
      extend ActsAsConsulController::SingletonMethods

      # Extender funcionalidad de Instancia
      include ActsAsConsulController::InstanceMethods
      
      current_power do
        controller_power
      end

      extend Config
    end
  end

  module Config
    def acts_as_consul_controller &block
      yield self if block_given?

      require_power_check
      
      power :crud=>:records, :as=>:consul_scope # self.power_options.merge(:as => :consul_scope) 
    end
  end # Config

  module SingletonMethods
    def self.extended(base)
      base.class_eval do
      end
    end

  end # SingletonMethods

  module InstanceMethods
    def self.included(base)
    end

    def security_scope
      self.send(:consul_scope)
    end
    
  end # InstanceMethods
end # ActAsConsulController
