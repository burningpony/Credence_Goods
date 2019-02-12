module Api
  class GroupsController < ApiController
    def show
      group = Group.find(params[:id])
      render json: group
    end
  end
end
