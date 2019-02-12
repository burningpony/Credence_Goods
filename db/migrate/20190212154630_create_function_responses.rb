class CreateFunctionResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :function_responses do |t|
      t.belongs_to :function, index: true
      t.belongs_to :user, index: true
      t.decimal :num_bought_value_coordinates
      t.decimal :num_bought_sample_points
      t.decimal :max_value_prediction
      t.integer :part
      t.time :time_to_response
      t.decimal :point_difference
      t.decimal :round_number
      t.timestamps
    end
  end
end
