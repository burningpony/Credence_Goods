class GroupChannel < ApplicationCable::Channel
  def subscribed
    stream_from specific_channel(params[:group_id]) 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_change(selected_group)
    puts selected_group
    emit specific_channel(selected_group["group_id"]),selected_group
  end

  
  def receive(payload)
    puts payload
    send_change(payload)
  end

  private

  
  def specific_channel(id)
    "group_#{id}"
  end

end
