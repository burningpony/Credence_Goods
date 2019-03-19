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
    emit specific_channel(data["pair_id"]),response_format('finish', nil)
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
  def response_format(action, data)
    return { action: action, data: data }
  end

  def specific_channel(id)
    "pair_#{id}"
  end

end
