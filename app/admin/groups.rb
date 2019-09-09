ActiveAdmin.register Group do

  permit_params :name,
                :created_at,
                :updated_at,
                :salary_payment,
                :capitation_payment,
                :ffs_payment,
                :number_of_rounds,
                :default_payment
                
  scope :all, default: true
end
