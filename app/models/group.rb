class Group < ApplicationRecord
  has_many :users
  belongs_to :function_set
  enum treatment_selection: [ :random, :selection, :patient]
end
