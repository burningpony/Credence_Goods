module Api
    
    class FunctionResponsesController < ApiController

        def create
            response = FunctionResponse.create(response_params)
            json_response(response)
        end

        def update
            response = FunctionResponse.find(params[:id])
            response.update(response_update_params)
            json_response(response)
        end


        private
        def response_params
            # whitelist params
            params.permit(:function_id, :user_id, :max_value_prediction, :num_bought_sample_points, :num_bought_value_coordinates, :part, :point_difference, :round_number)
        end

        def response_update_params
            # whitelist params
            params.permit(:max_value_prediction,:point_difference, :round_number)
        end

    end
end
