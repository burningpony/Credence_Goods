class FunctionResponsesChannel < ApplicationCable::Channel
  
  def subscribed
    stream_from specific_channel(params[:pair_id]) 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_change(function_response)
    emit specific_channel(function_response["pair_id"]),response_format('function_change', function_response["data"])
  end

  def notify_back(data)
    emit specific_channel(data["pair_id"]),response_format('back_to_groups', nil)
  end

  def finish(data)
    emit specific_channel(data["pair_id"]),response_format('payment_part2', nil)
  end
  
  def new_round(data)
    emit specific_channel(data["pair_id"]),response_format('new_round', nil)
  end

  def mouse_move(data)
    emit specific_channel(data["pair_id"]),response_format('mouse_move', data["data"])
  end

  def scrolling(data)
    if !data["data"].nil? #if positions its not valid
      emit specific_channel(data["pair_id"]),response_format('scrolling',data["data"])
    end
  end

  def receive(payload)
    send_change(payload)
  end

  private

  def specific_channel(id)
    "pair_#{id}"
  end

end
