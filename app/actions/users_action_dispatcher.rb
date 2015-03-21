class UsersActionDispatcher
  include ActsAsActionDispatcher
  
  acts_as_action_dispatcher do |config|
    config.default_sort = 'surname'
  end
end
