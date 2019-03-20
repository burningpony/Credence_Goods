module Api
    class UserPairsController < ApiController
        
        def update
            pair = UserPair.find(params[:id])
            pair.update(pair_update_params)
            pair.save
            json_response(pair)
        end

        private
        def pair_update_params
            # whitelist params
            params.permit(:id,:round)
        end

    end
end
