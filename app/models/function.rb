class Function < ApplicationRecord
    belongs_to :function_set
    has_one :function_response
end
