require 'rails_helper'

RSpec.describe PermissionsController do
  it "recognizes and generates a route for show" do
    expect(get: '/current_user').to route_to({controller: "current_user", action: "show", "format"=>"json"})
  end
  
  it "recognizes and generates a route for update" do
    expect(put: '/current_user').to route_to({controller: "current_user", action: "update", "format"=>"json"})
  end
end
