require 'rails_helper'

describe Entities::EntitiesController do
  it "recognizes and generates a route for index" do
    expect(get: '/entities/1/entities.json').to route_to({controller: "entities/entities", action: "index", "format"=>"json", "entity_id"=>"1"})
  end

  it "recognizes and generates a route for index" do
    expect(get: '/entities/1/entities/123.json').to route_to({controller: "entities/entities", action: "show", "format"=>"json", "entity_id"=>"1", id: "123"})
  end

  it "recognizes and generates a route for post" do
    expect(post: '/entities/1/entities.json').to route_to({controller: "entities/entities", action: "create", "format"=>"json", "entity_id"=>"1"})
  end

  it "recognizes and generates a route for put" do
    expect(put: '/entities/1/entities/123.json').to route_to({controller: "entities/entities", action: "update", "format"=>"json", id: "123", "entity_id"=>"1"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: '/entities/1/entities/123.json').to route_to({controller: "entities/entities", action: "destroy", "format"=>"json", id: "123", "entity_id"=>"1"})
  end
end
