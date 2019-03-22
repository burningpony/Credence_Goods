class RoundChannel < ApplicationCable::Channel
  def subscribed
    stream_from specific_channel(params[:pair_id]) 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts(data)
    emit specific_channel(data["pair_id"]),nil
  end

  private

  
  def specific_channel(id)
    "round_pair_#{id}"
  end

end
