module ActsAsActionDispatcherController
  include ExtJsRendererController
  
  def self.included(klass)
    
#    klass.before_filter :load_record, only: [:show, :update, :destroy]
    klass.before_action :load_service

    # Parametros configurables
    # service_controller_class
    klass.class_attribute :allowed_params

    klass.rescue_from Exception, :with => :error_page # if Rails.env.production?

    klass.class_eval do
      # Extender funcionalidad de Clase
      extend ActsAsActionDispatcherController::SingletonMethods

      # Extender funcionalidad de Instancia
      include ActsAsActionDispatcherController::InstanceMethods
      
      extend Config
    end
  end
  
  module Config
    def acts_as_action_dispatcher_controller &block
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

    def load_service
      @service = service_object
    end
    
    # Delegar en el servicio el resultado de la accion
    def action_missing(method_name, *arguments, &block)
      if @service.respond_to?(method_name)
        extjs_render do
          @service.send(method_name, allowed_params)
        end
      else
        super
      end
    end
    
    def error_page exception
      respond_to do |format|
        extjs_render_exception format, exception
      end
    end
    
  end # InstanceMethods
end # ActsAsActionDispatcherController
