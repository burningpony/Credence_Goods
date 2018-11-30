module Api
  class FunctionResponseController < ApiController
    def show
      group = Group.find(params[:id])

      render json: group
    end
  end
end
