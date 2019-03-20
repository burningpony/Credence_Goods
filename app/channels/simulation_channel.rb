class SimulationChannel < ApplicationCable::Channel
  
  def subscribed
     #print params
     stream_from specific_channel(params[:room]) 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def request_pair(data)
    pair = UserPair.request_pair(data["data"],1)
    emit(specific_channel(data["room"]), pair)
  end 
  
  def confirm_pair

  end


  private

  def specific_channel(id)
    "simulation_#{id}"
  end

end
