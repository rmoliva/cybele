# Este es el controlador encargado de lanzar las aplicaciones

class MainController < ApplicationController
  layout "webpack", :only => "webpack"
  
  # Accion para lanzar aplicaciones
  def index
    
  end
  
  def webpack
    
  end

end
