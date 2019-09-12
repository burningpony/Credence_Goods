# This will guess the User class
FactoryBot.define do
  factory :function do
    min_x { 0 }
    max_x { 100 }
    function_set
  end
end