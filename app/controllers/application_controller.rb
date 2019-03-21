class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: 'user', password: '123456789'
end
