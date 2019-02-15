class AddFunctionSetIdToGroups < ActiveRecord::Migration[5.2]
  def change
    add_reference :groups, :function_set, foreign_key: true, null: true
  end
end
