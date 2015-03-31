module Container
  class Related
    include Mongoid::Document
    include ActiveModel::Validations
  
    field :entity_id, type: Integer
    field :name, type: String
    index(:entity_id => 1, :name => 1)

    validates_presence_of :entity_id, :name

    NUM_FIELDS = 30
    
    class << self
      def field_prefix
        "related"
      end
    end

    NUM_FIELDS.times do |index|
      field :"related#{index}_type", type: String
      field :"related#{index}_id", type: Fixnum
      index({:"related#{index}_type" => 1,:"related#{index}_id" => 1})
    end
  end
end