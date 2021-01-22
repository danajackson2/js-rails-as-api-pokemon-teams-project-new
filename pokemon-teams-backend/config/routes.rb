Rails.application.routes.draw do
  resources :pokemons, only:[:index, :create, :destroy]
  resources :trainers, only:[:index]
end
