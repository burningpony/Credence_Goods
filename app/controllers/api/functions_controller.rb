module Api
    class FunctionsController < ApiController
        def index
            functions = Function.where(:function_set_id => params[:function_set_id] ).all()
            functions = functions.map { |fun|{
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