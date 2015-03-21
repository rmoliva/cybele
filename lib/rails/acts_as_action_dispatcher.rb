module ActsAsActionDispatcher
  def self.included(klass)
#    klass.before_filter :load_record, only: [:show, :update, :destroy]
#    klass.before_filter :load_records, only: [:index]

    attr_reader :user, :scope

    # Parametros configurables
    klass.class_attribute :default_sort
    klass.class_attribute :main_param_id

    klass.class_eval do
      # Extender funcionalidad de Clase
      extend ActsAsActionDispatcher::SingletonMethods

      # Extender funcionalidad de Instancia
      include ActsAsActionDispatcher::InstanceMethods

      extend Config
    end
  end


  module Config
    def acts_as_action_dispatcher &block
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


    def initialize scope
      @scope = scope
    end
  
    
    # page
    # per_page
    # start
    # limit
    # sort
    # dir
    def index params
      dir = params[:dir] || 'asc'
      sort = params[:sort] || self.class.default_sort
      per_page = params[:per_page] || params[:limit] || Kaminari::Configuration.default_per_page
  
      scope = @scope.page(
        params[:page]
      ).per(
        per_page
      ).order(
        "#{sort} #{dir}"
      )
      [scope, @scope.count]
    end
    
    # Retornar el usuario con el id pasado
    def show params
      @scope.find(params[:id])
    end
    
    def create params
      @scope.create!(params[:record])
    end
    
    def update params
      record = @scope.find(params[:id])
      record.update_attributes!(params[:record])
      record
    end
    
    def destroy params
      record = @scope.find(params[:id])
      record.destroy
    end

  end # InstanceMethods
end # ActsAsActionDispatcher
