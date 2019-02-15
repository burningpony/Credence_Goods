module Api
    class FunctionsController < ApiController
        def index
            group = Group.find(params[:group_id])
            function_set = group.function_set
            functions = function_set.functions.map { |fun|{
                :id => fun.id,
                :min_x => fun.min_x.to_i,
                :min_y => fun.min_y.to_i,
                :max_x => fun.max_x.to_i,
                :max_y => fun.max_y.to_i,
                :representation => fun.string_representation_of_function,
                }
            }
            json_response(functions)
        end
    end
end