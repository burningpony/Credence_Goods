module Api
  class UsersController < ApiController
    def create
      group = Group.find_by(name: user_params[:group_name])
      
      #role based on the last role assigned on the group
      user_role = User.last_user_by_group_id(group.id)
      
      if user_role.count > 0
        if user_role.first.role == "A"
          role = "B"
        else
          role = "A"
        end
      else
        role = "A"
      end

      user = User.create(group: group,role: role)
      if user.save
        render json: user
      else
        render json: { errors: user.errors.full_messages }
      end
    end

    def update
      user = User.find(params[:id])
      if user.update(finished_at: Time.current)
        render json: true
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
