module Api
    class FunctionSetsController < ApiController
        def index
            group = Group.find(params[:group_id])
            function_sets = group.function_sets
            json_response(function_sets)
        end
    end
end
