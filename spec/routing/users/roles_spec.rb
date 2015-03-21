
require 'rails_helper'

describe Users::RolesController do
  it "recognizes and generates a route for index" do
    expect(get: 'users/1/roles.json?app=central').to route_to({controller: "users/roles", action: "index", "format"=>"json", user_id: "1", app: "central"})
  end

  it "recognizes and generates a route for index" do
    expect(get: 'users/1/roles/123.json?app=central').to route_to({controller: "users/roles", action: "show", "format"=>"json", id: "123", user_id: "1", app: "central"})
  end

  it "recognizes and generates a route for post" do
    expect(post: 'users/1/roles.json?app=central').to route_to({controller: "users/roles", action: "create", "format"=>"json", user_id: "1", app: "central"})
  end

  it "recognizes and generates a route for put" do
    expect(put: 'users/1/roles/123.json?app=central').to route_to({controller: "users/roles", action: "update", "format"=>"json", id: "123", user_id: "1", app: "central"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: 'users/1/roles/123.json?app=central').to route_to({controller: "users/roles", action: "destroy", "format"=>"json", id: "123", user_id: "1", app: "central"})
  end
end
