class FunctionSet < ApplicationRecord
    has_one :group
    has_many :functions
end
