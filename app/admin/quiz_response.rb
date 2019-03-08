ActiveAdmin.register QuizResponse do

  permit_params :user_id
  permit_params :responses

  scope :all, default: true
end
