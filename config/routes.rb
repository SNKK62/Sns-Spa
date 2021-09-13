Rails.application.routes.draw do
  get 'relationships/create'
  get 'relationships/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: redirect('/posts')
  get 'users', to: 'root#index'
  get 'posts', to: 'root#index'
  get 'users/:id', to: 'root#index'
  get 'signup', to: 'root#index'
  get 'login', to: 'root#index'
  get 'users/:id/followings', to: 'root#index'
  get 'users/:id/followers', to: 'root#index'
  
  post 'api/v1/login', to: 'api/v1/sessions#create'
  delete 'api/v1/logout', to: 'api/v1/sessions#destroy'
  get 'api/v1/logged_in', to: 'api/v1/sessions#logged_in'
  get 'api/v1/users/following/:id' , to: 'api/v1/users#following'
  post 'api/v1/relationships/:id' , to: 'api/v1/relationships#create'
  delete 'api/v1/relationships/:id', to: 'api/v1/relationships#destroy'
  get 'api/v1/usernames', to: 'api/v1/users#names'

  namespace :api do
    namespace :v1 do
      resources :users do
        member do
          get :followings, :followers, :posts
          resources :posts
        end
      end
      resources :posts 
   
    end
  end 
end
