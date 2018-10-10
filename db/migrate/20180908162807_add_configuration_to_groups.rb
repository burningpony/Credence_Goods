class AddConfigurationToGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :name, :string, null: false, uniq: true
    add_column :groups, :player_a_can_choose_player_b_payment, :boolean, default: false, null: false
    add_column :groups, :sample_value_points_allowed, :boolean, default: true, null: false
    add_column :groups, :sample_value_coordinates_allowed, :boolean, default: true, null: false
    add_column :groups, :treatment_selection, :integer, default: 1, null: false
    add_column :groups, :salary_payment, :decimal, :precision => 8, :scale => 2, default: 24, null: false
    add_column :groups, :capitation_payment, :decimal, :precision => 8, :scale => 2, default: 0.65, null: false
    add_column :groups, :ffs_payment, :decimal, :precision => 8, :scale => 2, default: 0.20, null: false
  end
end
