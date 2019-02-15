module Api
    class FunctionSetsController < ApiController
        def index
            group = Group.find(params[:group_id])
            function_set = group.function_set
            function_set =  {'id' => function_set.id, 'name' => function_set.name, 'functions' => function_set.functions} 
            json_response(function_set)
        end
    end
end
