class FunctionResponse < ApplicationRecord
    belongs_to :function
    enum part: [1,2]
    before_create :set_parameters

    def set_parameters
        
    end
    
end
