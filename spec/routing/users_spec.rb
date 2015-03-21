require 'rails_helper'

describe UsersController do
  it "recognizes and generates a route for index" do
    expect(get: '/users.json').to route_to({controller: "users", action: "index", "format"=>"json"})
  end

  it "recognizes and generates a route for index" do
    expect(get: '/users/123.json').to route_to({controller: "users", action: "show", "format"=>"json", id: "123"})
  end

  it "recognizes and generates a route for post" do
    expect(post: '/users.json').to route_to({controller: "users", action: "create", "format"=>"json"})
  end

  it "recognizes and generates a route for put" do
    expect(put: '/users/123.json').to route_to({controller: "users", action: "update", "format"=>"json", id: "123"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: '/users/123.json').to route_to({controller: "users", action: "destroy", "format"=>"json", id: "123"})
  end
end
