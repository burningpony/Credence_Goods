module Api
    class FunctionSetsController < ApiController
        def index
            funtion_sets = FunctionSet::paginate(page: params[:page], per_page: 10)
            json_response(funtion_sets)
        end
    end
end
