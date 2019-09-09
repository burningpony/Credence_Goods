class Group < ApplicationRecord
  has_many :users
  has_many :function_sets
  enum default_payment: [ :salary, :capitation, :ffs]
end
