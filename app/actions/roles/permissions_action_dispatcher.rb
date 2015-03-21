module Roles
  class PermissionsActionDispatcher
    include ActsAsActionDispatcher
    
    acts_as_action_dispatcher do |config|
      config.default_sort = 'role_id'
    end
    
  end
end