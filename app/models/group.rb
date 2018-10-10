class Group < ApplicationRecord
  has_many :users

  enum treatment_selection: [ :random, :selection, :patient]
end
