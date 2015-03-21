module Users
  class RolesActionDispatcher
    include ActsAsActionDispatcher
    
    acts_as_action_dispatcher do |config|
      config.default_sort = 'user_id'
    end
  end
end