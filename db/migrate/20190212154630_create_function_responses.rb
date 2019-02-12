class CreateFunctionResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :function_responses do |t|
      t.belongs_to :function, index: true
      t.belongs_to :user, index: true
      t.double :num_bought_value_coordinates
      t.double :num_bought_sample_points
      t.double :max_value_prediction
      t.integer :part
      t.time :time_to_response
      t.double :point_difference
      t.double : round_number
      t.timestamps
    end
  end
end
