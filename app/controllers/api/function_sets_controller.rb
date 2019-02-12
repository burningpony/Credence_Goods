module Api
    class FunctionSetsController < ApiController
        def index
            function_sets = FunctionSet::paginate(page: params[:page], per_page: 10)
            json_response(function_sets)
        end
    end
end
