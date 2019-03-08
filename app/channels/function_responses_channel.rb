class FunctionResponsesChannel < ApplicationCable::Channel
  
  def subscribed
    stream_from specific_channel(params[:pair_id]) 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_change(function_response)
    emit specific_channel(function_response["pair_id"]),function_response
  end
  
  def receive(payload)
    send_change(payload)
  end

  private

  def specific_channel(id)
    "pair_#{id}"
  end

end
