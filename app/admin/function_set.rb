ActiveAdmin.register FunctionSet do

  permit_params :name,
                :group_id

  scope :all, default: true
end
