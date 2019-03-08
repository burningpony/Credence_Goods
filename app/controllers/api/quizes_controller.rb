module Api
    class QuizesController < ApiController
        def create
            response = QuizResponse.create(responses: params[:responses],user_id: params[:user_id])
            
            json_response(response)
        end

        def response_params
            # whitelist params
            params.permit(:responses,:user_id)
        end
    end
end
