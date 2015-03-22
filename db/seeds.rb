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
