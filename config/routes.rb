Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  
  mount PgHero::Engine, at: "pghero"
  
  resources :sessions, :only => [:create], :defaults => { :format => 'json' } do
    collection do
      get 'show'
      delete 'destroy'
    end
  end
  
  # Se hace lo siguiente porque ni edit ni update necesitan el id
  # del usuario, ya que se refieren siempre al logeado
  get 'current_user' => 'current_user#show', :defaults => { :format => 'json' } 
  put 'current_user' => 'current_user#update', :defaults => { :format => 'json' }
  get 'current_user/permissions' => 'current_user#permissions', :defaults => { :format => 'json' }
  
  resources :users, :only => [:index, :show, :create, :update, :destroy], :defaults => { :format => 'json' } do
    resources :roles, :only => [:index, :show, :create, :update, :destroy] , :defaults => { :format => 'json' }, :controller => 'users/roles' 
  end

  resources :roles, :only => [:index, :show, :create, :update, :destroy] , :defaults => { :format => 'json' } do
    resources :permissions, :only => [:index, :show, :create, :update, :destroy] , :defaults => { :format => 'json' }, :controller => 'roles/permissions'
  end    
  resources :permissions, :only => [:show] , :defaults => { :format => 'json' }

  resources :entities, :only => [:index, :show, :create, :update, :destroy] , :defaults => { :format => 'json' } do
    resources :entities, :only => [:index, :show, :create, :update, :destroy] , :defaults => { :format => 'json' }, :controller => 'entities/entities'
    
    get 'containers/:container_name', :defaults => { :format => 'json' }, :controller => 'entities/containers', :action => 'index'
    get 'containers/:container_name/:id', :defaults => { :format => 'json' }, :controller => 'entities/containers', :action => 'show'
    post 'containers/:container_name', :defaults => { :format => 'json' }, :controller => 'entities/containers', :action => 'create'
    put 'containers/:container_name/:id', :defaults => { :format => 'json' }, :controller => 'entities/containers', :action => 'update'
    delete 'containers/:container_name/:id', :defaults => { :format => 'json' }, :controller => 'entities/containers', :action => 'destroy'
  end    
  get 'webpack' => 'main#webpack'
  root 'main#index'
end
