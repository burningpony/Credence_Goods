module Api
    
    class FunctionResponsesController < ApiController

        def create
            response = FunctionResponse.create(response_params)
            json_response(response)
        end

        private
        def response_params
            # whitelist params
            params.permit(:function_id, :user_id, :max_value_prediction, :num_bought_sample_points, :num_bought_value_coordinates, :part, :point_difference, :round_number)
        end

    end
end
