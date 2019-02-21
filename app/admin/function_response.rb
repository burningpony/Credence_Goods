ActiveAdmin.register FunctionResponse do

  permit_params :name

  scope :all, default: true
end
