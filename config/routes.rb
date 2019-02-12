Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  namespace :api, format: :json do
    resources :users, only: [:create]
    resources :groups, only: [:show]
    resources :function_sets ,only: [:index] do
      resources :functions , only: [:index]
    end
  end

  namespace :admin do
    root to: "admin#index"
  end

  root to: "experiment#index"

  get '*url', to: 'experiment#index', as: 'react'
end
