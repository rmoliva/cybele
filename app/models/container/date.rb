module Container
  class Date
    include Mongoid::Document
    include ActiveModel::Validations
  
    field :entity_id, type: Integer
    field :name, type: String
    index(:entity_id => 1, :name => 1)

    validates_presence_of :entity_id, :name

    NUM_FIELDS = 30
    DATA_TYPE = ::Date
    
    class << self
      def field_prefix
        DATA_TYPE.to_s.underscore
      end
    end

    NUM_FIELDS.times do |index|
      field :"#{field_prefix}#{index}", type: DATA_TYPE
      index(:"#{field_prefix}#{index}" => 1)
    end
  
  end
end