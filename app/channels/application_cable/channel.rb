module ApplicationCable
  class Channel < ActionCable::Channel::Base
    
    def emit(channel,data)
      ActionCable.server.broadcast(channel,data)
    end

  end
end
