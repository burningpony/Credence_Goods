class Group < ApplicationRecord
  has_many :users
  has_many :function_sets
  enum treatment_selection: [ :random, :selection, :patient]
end
