class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, only: [:id, :species, :nickname, :trainer_id]
    end

    def create
        render json: Pokemon.create(pokemon_params)
    end

    def destroy
        render json: Pokemon.find(params[:id].to_i).destroy
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end
end