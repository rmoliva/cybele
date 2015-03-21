module ActsAsPowerScope
  def self.included(klass)
#    klass.before_filter :load_record, only: [:show, :update, :destroy]
#    klass.before_filter :load_records, only: [:index]

    attr_reader :class_name

    # Parametros configurables
    klass.class_attribute :class_name

    klass.class_eval do
      include Consul::Power

      # Extender funcionalidad de Clase
      extend ActsAsPowerScope::SingletonMethods

      # Extender funcionalidad de Instancia
      include ActsAsPowerScope::InstanceMethods

      extend Config
      
      power :records do
        if @context.can?(self.class_name,:index)
          self.respond_to?(:index_scope) ? self.send(:index_scope) : self.send(:default_scope)
        end
      end
    
      power :updatable_records do
        if @context.can?(self.class_name,:update)
          self.respond_to?(:update_scope) ? self.send(:update_scope) : self.send(:default_scope)
        end
      end
    
      power :creatable_records do
        if @context.can?(self.class_name,:create)
          self.respond_to?(:create_scope) ? self.send(:create_scope) : self.send(:default_scope)
        end
      end
    
      power :destroyable_records do
        if @context.can?(self.class_name,:destroy)
          self.respond_to?(:destroy_scope) ? self.send(:destroy_scope) : self.send(:default_scope)
        end
      end
    end
  end


  module Config
    def acts_as_power_scope &block
      yield self if block_given?
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

  end # InstanceMethods
end # ActsAsPowerScope
