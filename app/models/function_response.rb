class FunctionResponse < ApplicationRecord
    belongs_to :function
    scope :find_by_user_id, -> (user_id) { where(:part => 2 ).where(:user_id => user_id) }
    attr_accessor :set_id
    def self.find_by_user_id_with_group(user_id)
        responses =  FunctionResponse.find_by_user_id(user_id)
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
