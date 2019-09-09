class RemoveUnusedColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :sample_value_coordinates_allowed
    remove_column :groups, :sample_value_points_allowed
    remove_column :groups, :treatment_selection
    remove_column :groups, :player_a_can_choose_player_b_payment
  end
end
