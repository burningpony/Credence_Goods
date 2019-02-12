class FunctionResponse < ApplicationRecord
    belongs_to :function
    enum part: [1,2]
    
end
