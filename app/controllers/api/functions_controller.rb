module Api
    class FunctionsController < ApiController
        def index
            function_sets = FunctionSet::find(params[:function_set_id])
            functions = function_sets.functions
            json_response(functions)

        end
    end
end