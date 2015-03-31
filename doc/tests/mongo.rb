require "mongoid"
require "faker"
require "awesome_print"
require 'benchmark'

num_records = 100000
drop_op = false
create_op = false
insert_op = false
query_op = true
col = "test"

# Mongoid.load!("mongoid.yml", :development)

session = Moped::Session.new(["127.0.0.1:27017"])
session.use :cybele_test

if drop_op
  puts "Borrar coleccion"
  
  # Nos aseguramos de que no exista la base de datos
  session.drop
  
  session.use :cybele_test
end 

if create_op
  puts "Creando indices en la nueva coleccion"
  
  # Crear indice sobre entity_id
  session[col].indexes.create(
    { :entity_id => 1 }
  )
  
  # Creamos una tabla de muchas columnas
  15.times do |index|
    session[col].indexes.create(
      { :entity_id => 1, :"string#{index}" => 1 }
    )
  end
  
  15.times do |index|
    session[col].indexes.create(
      { :entity_id => 1, :"date#{index}" => 1 }
    )
  end
  
  15.times do |index|
    session[col].indexes.create(
      { :entity_id => 1, :"entity#{index}_type" => 1, :"entity#{index}_id" => 1}
    )
  end
  
  15.times do |index|
    session[col].indexes.create(
      { :entity_id => 1, :"boolean#{index}" => 1}
    )
  end
end

if insert_op
  puts "insertando registros"
  
  # Vamos a insertar registros enormes
  measure = Benchmark.measure do
    num_records.times do |index|
      data = {:entity_id => index+1}
    
      30.times do |index|
        data["string#{index}"] = Faker::Name.name
      end
      
      30.times do |index|
        data["date#{index}"] = Faker::Time.between(2.years.ago, Time.now)
      end
      
      30.times do |index|
        data["entity#{index}_type"] = Faker::Name.first_name
        data["entity#{index}_id"] = rand(10000) + 1
      end
      
      30.times do |index|
        data["boolean#{index}"] = [true, false].sample
      end
      
      session[col].insert(data)
    end
  end
  
  puts "Insertados: #{num_records} en: #{measure}"
end

if query_op
  # Por ejemplo buscar todos los registros que contengan "Jensen" en la
  # string 7
  puts "buscando registros"

  data = nil
  measure = Benchmark.measure do
    data = session[col].find({:"string7" => /e/})
  end
  
  # data.each {|doc| ap doc}
  
  puts "Encontrados: #{data.count} en: #{measure}"
  
  
  
end

