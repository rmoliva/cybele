require 'rails_helper'

describe EntitiesController do
  it "recognizes and generates a route for index" do
    expect(get: '/entities.json').to route_to({controller: "entities", action: "index", "format"=>"json"})
  end

  it "recognizes and generates a route for index" do
    expect(get: '/entities/123.json').to route_to({controller: "entities", action: "show", "format"=>"json", id: "123"})
  end

  it "recognizes and generates a route for post" do
    expect(post: '/entities.json').to route_to({controller: "entities", action: "create", "format"=>"json"})
  end

  it "recognizes and generates a route for put" do
    expect(put: '/entities/123.json').to route_to({controller: "entities", action: "update", "format"=>"json", id: "123"})
  end

  it "recognizes and generates a route for destroy" do
    expect(delete: '/entities/123.json').to route_to({controller: "entities", action: "destroy", "format"=>"json", id: "123"})
  end
end
