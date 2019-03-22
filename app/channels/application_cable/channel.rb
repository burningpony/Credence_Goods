module ApplicationCable
  class Channel < ActionCable::Channel::Base
    
    def emit(channel,data)
      ActionCable.server.broadcast(channel,data)
    end

    def response_format(action, data)
      return { action: action, data: data }
    end

  end
end
