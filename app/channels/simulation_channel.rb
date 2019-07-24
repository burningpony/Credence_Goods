class SimulationChannel < ApplicationCable::Channel
  
  def subscribed
     #print params
     stream_from specific_channel(params[:room]) 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def request_pair(data)
    pair = UserPair.request_pair(data["data"]["id"],data["data"]["round"],data["data"]["group_id"])
    emit(specific_channel(data["room"]), response_format("request_pair",pair))
  end 

  def confirm_pair(data)
    emit(specific_channel(data["data"]["person_a_id"]),response_format("confirm_pair",data["room"]) )
    emit(specific_channel(data["data"]["person_b_id"]),response_format("confirm_pair",data["room"]) )
  end


  private

  def specific_channel(id)
    "simulation_#{id}"
  end

end
