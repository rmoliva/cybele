require 'rails_helper'

describe RolesController do
  it "recognizes and generates a route for index" do
    expect(get: '/roles.json').to route_to({controller: "roles", action: "index", "format"=>"json"})
  end

  it "recognizes and generates a route for index" do
    expect(get: '/roles/123.json').to route_to({controller: "roles", action: "show", "format"=>"json", id: "123"})
  end

  it "recognizes and generates a route for post" do
    expect(post: '/roles.json').to route_to({controller: "roles", action: "create", "format"=>"json"})
  end

  it "recognizes and generates a route for put" do
    expect(put: '/roles/123.json').to route_to({controller: "roles", action: "update", "format"=>"json", id: "123"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: '/roles/123.json').to route_to({controller: "roles", action: "destroy", "format"=>"json", id: "123"})
  end
end
