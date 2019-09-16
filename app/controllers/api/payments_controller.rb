module Api
    class PaymentsController < ApiController

        def show
            user = User.find(params[:user_id])
            part = params[:id] 
            payment = part == 1  ?  user.part_1_payment : user.part_2_payment
            json_response(payment)
        end

    end
end
