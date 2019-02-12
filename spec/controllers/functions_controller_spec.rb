require 'rails_helper'

RSpec.describe FunctionsController, type: :controller do
    describe 'GET function-sets/:id/functions' do
        # make HTTP get request before each example
        before { get 'function-sets/1/functions' }
    
        it 'returns functions' do
          # Note `json` is a custom helper to parse JSON responses
          expect(json).not_to be_empty
          expect(json.size).to eq(10)
        end
    
        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
      end
end
