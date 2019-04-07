ActiveAdmin.register Group do

  permit_params :name,
                :created_at,
                :updated_at,
                :player_a_can_choose_player_b_payment,
                :sample_value_points_allowed,
                :sample_value_coordinates_allowed,
                :treatment_selection,
                :salary_payment,
                :capitation_payment,
                :ffs_payment,
                :number_of_rounds
                
  scope :all, default: true
end
