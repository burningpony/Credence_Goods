class FunctionSet < ApplicationRecord
    belongs_to :group
    has_many :functions
end
