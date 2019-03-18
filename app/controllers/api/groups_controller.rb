module Api
  class GroupsController < ApiController
    def show
      group = Group.find(params[:id])
      json_response(group)
    end
  end
end
