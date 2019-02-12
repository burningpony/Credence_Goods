require 'rails_helper'

RSpec.describe FunctionResponsesController, type: :controller do
    describe 'POST /function-responses' do
        # valid payload
        let(:valid_attributes) { { title: 'Learn Elm', created_by: '1' } }
    
        context 'when the request is valid' do
          before { post '/function-responses', params: valid_attributes }
    
          it 'creates a todo' do
            expect(json['title']).to eq('Learn Elm')
          end
    
          it 'returns status code 201' do
            expect(response).to have_http_status(201)
          end
        end
    
        context 'when the request is invalid' do
          before { post '/function-responses', params: { title: 'Foobar' } }
    
          it 'returns status code 422' do
            expect(response).to have_http_status(422)
          end
    
          it 'returns a validation failure message' do
            expect(response.body)
              .to match(/Validation failed: Created by can't be blank/)
          end
        end
      end
end
