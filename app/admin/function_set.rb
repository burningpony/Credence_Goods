ActiveAdmin.register FunctionSet do

  permit_params :name

  scope :all, default: true
end
