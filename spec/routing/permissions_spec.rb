require 'rails_helper'

RSpec.describe PermissionsController do
  it "recognizes and generates a route for index" do
    expect(get: '/permissions/central').to route_to({controller: "permissions", action: "show", "format"=>"json", id: "central"})
  end
end
