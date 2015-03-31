require "benchmark"

namespace :tests do
  namespace :items do

    desc "Vaciar todos los elementos de las colecciones usadas"
    task :destroy_all => :environment do |task, args|
      # Vaciar la coleccion primero
      puts "Vaciando la base de datos"
      Container::BigDecimal.destroy_all
      Container::Boolean.destroy_all
      Container::DateTime.destroy_all
      Container::Date.destroy_all
      Container::Related.destroy_all
      Container::String.destroy_all
    end
    
    desc "Crear una lista de items con datos aleatorios"
    task :create, [:num_entities,:num_components] => :environment do |task, args|
      num_entities = (args[:num_entities] || 100).to_i
      num_components = (args[:num_components] || 100).to_i

      puts "Creando: #{num_entities} entidades con #{num_components}"
      measure = Benchmark.measure do
        num_entities.times do |entity_id|
          puts "Entidad: #{entity_id}"
          
          num_components.times do |component_id|
            puts "Component: #{component_id}"
            # Crear los big decimal
            fields = 30
            
            big_decimals = {:entity_id => entity_id,:name => "component#{component_id}"}
            booleans = {:entity_id => entity_id,:name => "component#{component_id}"}
            date_times = {:entity_id => entity_id,:name => "component#{component_id}"}
            dates = {:entity_id => entity_id,:name => "component#{component_id}"}
            related = {:entity_id => entity_id,:name => "component#{component_id}"}
            strings = {:entity_id => entity_id,:name => "component#{component_id}"}
            
            fields.times do |index|
              big_decimals["big_decimal#{index}"] = BigDecimal(Faker::Number.number(10).to_s)
              booleans["boolean#{index}"] = [true,false].sample
              date_times["date_time#{index}"] = Faker::Time.between(2.years.ago, Time.now)
              dates["date#{index}"] = Faker::Time.between(2.years.ago, Time.now)
              related["related#{index}_type"] = Faker::Name.first_name
              related["related#{index}_id"] = rand(10000) + 1
              strings["string#{index}"] = Faker::Name.first_name
            end
            
             Container::BigDecimal.create(big_decimals)
             Container::Boolean.create!(booleans)
             Container::DateTime.create!(date_times)
             Container::Date.create!(dates)
             Container::Related.create!(related)
             Container::String.create!(strings)
          end # num_components
          
        end # num_entities
      end # measure
      
      puts "Insertados: #{num_entities} en: #{measure}"
      
    end # create
    
    desc "Buscar elementos heterogeneos y medir resultado"
    task :query => :environment do |task, args|
      
      
      
      
    end # query
    
  end # items
end # tests  

      
