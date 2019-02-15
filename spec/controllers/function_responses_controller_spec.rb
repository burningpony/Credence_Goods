require 'rails_helper'

RSpec.describe FunctionResponsesController, type: :controller do
    describe 'POST /function-responses' do
        # valid payload
        let(:valid_attributes) { { function_id: 1, user_id: 1 ,num_bought_value_coordinates:0,num_bought_sample_points: 0, max_value_prediction: 0, part: 1,time_to_response: 0,point_difference: 0,round_number: 0  } }
    
        context 'when the request is valid' do
          before { post '/function-responses', params: valid_attributes }
          #draft of tests  
          it 'creates a response' do
            expect(json['function_id']).to eq(1)
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
