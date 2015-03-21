require 'rails_helper'

describe Roles::PermissionsController do
  it "recognizes and generates a route for index" do
    expect(get: 'roles/1/permissions.json?app=central').to route_to({controller: "roles/permissions", action: "index", "format"=>"json", role_id: "1", app: "central"})
  end

  it "recognizes and generates a route for index" do
    expect(get: 'roles/1/permissions/123.json?app=central').to route_to({controller: "roles/permissions", action: "show", "format"=>"json", id: "123", role_id: "1", app: "central"})
  end

  it "recognizes and generates a route for post" do
    expect(post: 'roles/1/permissions.json?app=central').to route_to({controller: "roles/permissions", action: "create", "format"=>"json", role_id: "1", app: "central"})
  end

  it "recognizes and generates a route for put" do
    expect(put: 'roles/1/permissions/123.json?app=central').to route_to({controller: "roles/permissions", action: "update", "format"=>"json", id: "123", role_id: "1", app: "central"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: 'roles/1/permissions/123.json?app=central').to route_to({controller: "roles/permissions", action: "destroy", "format"=>"json", id: "123", role_id: "1", app: "central"})
  end
end
