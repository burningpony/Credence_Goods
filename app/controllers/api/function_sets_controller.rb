module Api
    class FunctionSetsController < ApiController
        def index
            function_sets = FunctionSet.page(params[:page]).per(10)
            json_response(function_sets)
        end
    end
end
