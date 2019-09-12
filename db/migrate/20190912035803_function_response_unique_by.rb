class FunctionResponseUniqueBy < ActiveRecord::Migration[5.2]
  def change
    add_index :function_responses, [:user_id, :function_id, :part, :round_number], unique: true, name: :function_response_uniqueness
    add_index :user_pairs, [:person_a_id, :person_b_id, :round], unique: true, name: :user_pair_uniqueness
  end
end
