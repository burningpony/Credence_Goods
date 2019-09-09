Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  namespace :api, format: :json do
    resources :users, only: [:create] do
      resources :function_responses, only: [:index]
    end
    resources :user_pairs, only: [:update]
    resources :quizes, only: [:create]
    resources :groups, only: [:show, :index] do
      resources :function_sets ,only: [:index] do
        resources :functions , only: [:index,:show,:create] do
          resources :function_responses, only: [:create,:update]
        end
      end
    end
  end

  namespace :admin do
    root to: "admin#index"
  end
  mount ActionCable.server => '/cable'
  root to: "experiment#index"

  get '*url', to: 'experiment#index', as: 'react'
end
