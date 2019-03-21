module Api
  class UsersController < ApiController
    def create
      group = Group.find_by(name: user_params[:group_name])
      role = ["A","B"].sample
      user = User.create(group: group,role: role)
      if user.save
        render json: user
      else
        render json: { errors: user.errors.full_messages }
      end
    end

    private

    def user_params
      params.permit(:group_name)
    end
  end
end
