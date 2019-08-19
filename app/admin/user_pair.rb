ActiveAdmin.register UserPair do

  permit_params :person_a,
                :person_b

  scope :all, default: true
end
