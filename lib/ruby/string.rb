# -*- encoding : utf-8 -*-

class String
  # El orden es el siguiente:
  # vocales_mayusculas - consonantes_mayusculas - vocales_minusculas - consonantes_minusculas
  # Sustituye caracteres internacionales por caracteres ansi
  # Esto se utiliza para mejorar la forma de ordenar que tiene
  # Ruby.
  def uncolate
    self.tr('ÁÉÍÓÚÜÇÑáéíóúüçñºª','AEIOUUCNaeiouucn  ').downcase
  end

  def to_boolean(nil_value = false) 
    return nil_value if self.size == 0
    !(self.to_s =~ /no|false|0|off/i)
  end

end