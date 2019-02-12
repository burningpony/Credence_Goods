class CreateFunctionResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :function_responses do |t|
      t.belongs_to :function, index: true
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
