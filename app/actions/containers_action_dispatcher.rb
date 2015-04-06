class ContainersActionDispatcher
  include ActsAsActionDispatcher
  
  acts_as_action_dispatcher do |config|
    config.default_sort = 'entity_id, name'
  end
end
