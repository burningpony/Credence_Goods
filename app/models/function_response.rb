class FunctionResponse < ApplicationRecord
    belongs_to :function
    enum part: [ :unknown, :part_1, :part_2]

    attr_accessor :set_id
    def self.find_by_user_id_with_group(user_id)
        responses =  FunctionResponse.where(:part => :part_2 ).where(:user_id => user_id)
        responses.map { |res| 
            res.attributes.merge({
                :set_id => res.set_id
            })
        }
        
    end
    
    def set_id
        self.function.function_set_id
    end


end
