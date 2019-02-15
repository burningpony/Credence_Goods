ActiveAdmin.register Function do

  permit_params :function_set_id,
                :min_x,
                :min_y,
                :max_x,
                :max_y,
                :string_representation_of_function,
                :updated_at

  scope :all, default: true
end
