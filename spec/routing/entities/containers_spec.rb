require 'rails_helper'

describe Entities::ContainersController do
  it "recognizes and generates a route for index" do
    expect(get: '/entities/1/containers/pepe.json').to route_to({controller: "entities/containers", action: "index", "format"=>"json", "entity_id"=>"1", "container_name"=>"pepe"})
  end

  it "recognizes and generates a route for index" do
    expect(get: '/entities/1/containers/pepe/123.json').to route_to({controller: "entities/containers", action: "show", "format"=>"json", "entity_id"=>"1", "container_name"=>"pepe", "id"=>"123"})
  end

  it "recognizes and generates a route for post" do
    expect(post: '/entities/1/containers/pepe.json').to route_to({controller: "entities/containers", action: "create", "format"=>"json", "entity_id"=>"1", "container_name"=>"pepe"})
  end

  it "recognizes and generates a route for put" do
    expect(put: '/entities/1/containers/pepe/123.json').to route_to({controller: "entities/containers", action: "update", "format"=>"json", "entity_id"=>"1", "container_name"=>"pepe", "id"=>"123"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: '/entities/1/containers/pepe/123.json').to route_to({controller: "entities/containers", action: "destroy", "format"=>"json", "entity_id"=>"1", "container_name"=>"pepe", "id"=>"123"})
  end
end
