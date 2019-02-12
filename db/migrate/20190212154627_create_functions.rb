class CreateFunctions < ActiveRecord::Migration[5.2]
  def change
    create_table :functions do |t|
      t.belongs_to :function_set, index: true
      t.string :string_representation_of_function
      t.double :min_x
      t.double :min_y
      t.double :max_x
      t.double :max_y
      t.timestamps
    ends
  end
end
