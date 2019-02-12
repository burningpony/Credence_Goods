class CreateFunctions < ActiveRecord::Migration[5.2]
  def change
    create_table :functions do |t|
      t.belongs_to :function_set, index: true
      t.string :string_representation_of_function
      t.decimal :min_x
      t.decimal :min_y
      t.decimal :max_x
      t.decimal :max_y
      t.timestamps
    end
  end
end
