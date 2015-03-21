class RolesActionDispatcher
  include ActsAsActionDispatcher
  
  acts_as_action_dispatcher do |config|
    config.default_sort = 'name'
  end
  
end
