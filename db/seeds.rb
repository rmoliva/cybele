# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


puts "Creando paises"
# https://github.com/umpirsky/country-list/blob/master/country/icu/en/country.json
countries = YAML::load_file(File.join(__dir__, 'country.yaml'))

countries.each do |code, name|
  Country.where(:code => code).first_or_create!(:name => name)
end

if User.count == 0
  puts "Creando usuario Administrador"
  
  # Crear el usuario administrado
  User.create!(
      name: "Admin",
      surname: "Admin",
      gender: "male",
      active:  true,
      email: "info@lciberica.es",
      password: "admin123456",
      password_confirmation: "admin123456"
  )
  
  puts "Creando 100 usuarios de prueba"
  
  100.times do
      pwd = Faker::Lorem.characters(20)
  
      User.create!(
          name: Faker::Name.first_name,
          surname: Faker::Name.last_name,
          gender: User.new.assignable_genders.sample,
          active:  true,
          email: Faker::Internet.email,
          password: pwd,
          password_confirmation: pwd
      )
  end
end # Tiene usuarios creados?

# Crear un rol de superadministrador central

puts "Creando rol Superadministrador central con todos los permisos"

role = Role.where(:name => 'Superadministrator',:app => 'central').first_or_create!

puts "Asignando el rol al administrador"

RoleUser.where(:role_id => role,:user_id=>User.first).first_or_create!

# Asignarle todos los permisos
%w(central).each do |app|
  puts "- Permisos de app: #{app}"
  Permission.send(app.to_sym).each do |klass, action_list|
    puts "-- klass: #{klass}"
    action_list.each do |action|
      puts "-- action: #{action}"
      permission = RolePermission.where(
        :role_id => role,
        :app => app,
        :klass => klass,
        :action => action,
      ).first_or_create!(
        :value => 1
      )
    end
  end
end

# Crear una congregacion
puts "Creando congregacion Concepcionistas"

congregacion = Entity.where(
  :parent_id => nil, 
  :name => "Concepcionistas Misioneras de la Enseñanza" 
).first_or_create!(
  :country_id => Country.spain.id,
  :child_label => 'Organismo',
  :child_labels => 'Organismos',
  :label => 'Congregación'
)

# Crear los organismos
organismos = [{
  :country => 'ES',
  :name => "Gobierno General",
  :comunidades => [{
    :name => 'Larantuka',
    :active => true
  },{
    :name => 'Madrid-Princesa',
    :active => true
  },{
    :name => 'Madrid-Sánchez Guerrero',
    :active => true
  },{
    :name => 'Roma',
    :active => true
  },{
    :name => 'Thelathuruth',
    :active => true
  },{
    :name => 'Buitrago',
    :active => false
  },{
    :name => 'Venafro',
    :active => false
  }],
},{
  :country => 'ES',
  :name => "Provincia de España",
  :comunidades => [{
    :name => 'Arenys de Mar',
    :active => true
  },{
    :name => 'Barcelona',
    :active => true
  },{
    :name => 'Burgos',
    :active => true
  },{
    :name => 'Granada',
    :active => true
  },{
    :name => 'Las Rozas',
    :active => true
  },{
    :name => 'Madrid-Belisana',
    :active => true
  },{
    :name => 'Madrid-Hortaleza',
    :active => true
  },{
    :name => 'Manzanares',
    :active => true
  },{
    :name => 'Marcilla',
    :active => true
  },{
    :name => 'Ponferrada',
    :active => true
  },{
    :name => 'Pozoblanco',
    :active => true
  },{
    :name => 'San Lorenzo de El Escorial',
    :active => true
  },{
    :name => 'Santa Cruz de Mudela',
    :active => true
  },{
    :name => 'Santa Fe',
    :active => true
  },{
    :name => 'Santiago de Compostela',
    :active => true
  },{
    :name => 'Segovia',
    :active => true
  },{
    :name => 'Alicante',
    :active => false
  },{
    :name => 'Almaden',
    :active => false
  },{
    :name => 'Arroyo del Puerco',
    :active => false
  }],
},{
  :country => 'ES',
  :name => "Casas Generalicias",
  :comunidades => [],
},{
  :country => 'BR',
  :name => "Provincia de Brasil",
  :comunidades => [],
},{
  :country => 'VE',
  :name => "Provincia del Caribe",
  :comunidades => [],
},{
  :country => 'JP',
  :name => "Provincia de Asia",
  :comunidades => [],
},{
  :country => 'US',
  :name => "Delegación de América del Norte",
  :comunidades => [],
},{
  :country => 'CM',
  :name => "Delegación de África",
  :comunidades => []
}]

organismos.each do |data|
  country = Country.find_by_code(data[:country])
  
  puts "- Creando organismo: #{data[:name]}"
  
  organismo = Entity.where(
    :parent_id => congregacion, 
    :name => data[:name]
  ).first_or_create!(
    :country_id => country.id,
    :child_label => 'Comunidad',
    :child_labels => 'Comunidades',
    :label => 'Organismo'
  )
  
  data[:comunidades].each do |data2|
    puts "-- Creando comunidad: #{data2[:name]} (#{data2[:active].inspect})"
    
    comunidad = Entity.where(
      :parent_id => organismo, 
      :name => data2[:name]
    ).first_or_create!(
      :country_id => country.id,
      :child_label => 'Misión',
      :child_labels => 'Misiones',
      :label => 'Comunidad',
      :open => data2[:active]
    )
  end
end


