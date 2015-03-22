module UserMacros

  # Para el envio como parametro en url
  # se convierte un objeto usuario a hash
  def user_to_hash(user)
    {
      :password => user.password,
      :password_confirmation => user.password_confirmation,
      :email => user.email,      
      :name => user.name,
      :surname => user.surname, 
      :gender => user.gender, 
      :address => user.address, 
      :city => user.city, 
      :state => user.state, 
      :postal_code => user.postal_code, 
      :phone1 => user.phone1, 
      :phone2 => user.phone2, 
      :email2 => user.email2 
    }
  end
  
  # Devuelve true si tiene los datos mas importantes comunes
  def match_users(user1,user2)
    user1.email == user2[:email] and
    user1.name == user2[:name] and
    user1.surname == user2[:surname] and 
    user1.gender == user2[:gender] and
    user1.address == user2[:address] and
    user1.city == user2[:city] and
    user1.state == user2[:state] and
    user1.postal_code == user2[:postal_code] and
    user1.phone1 == user2[:phone1] and
    user1.phone2 == user2[:phone2] and
    user1.email2 == user2[:email2] 
  end
  
  def debug user
    ap ({
      :email => user[:email],
      :name => user[:name],
      :surname => user[:surname], 
      :gender => user[:gender],
      :address => user[:address],
      :city => user[:city],
      :state => user[:state],
      :postal_code => user[:postal_code],
      :phone1 => user[:phone1],
      :phone2 => user[:phone2],
      :email2 => user[:email2]
    })
  end
  
end
