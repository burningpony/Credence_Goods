require 'rails_helper'

# t.bigint "function_id"
# t.bigint "user_id"
# t.decimal "num_bought_value_coordinates"
# t.decimal "num_bought_sample_points"
# t.decimal "max_value_prediction"
# t.integer "part"
# t.time "time_to_response"
# t.decimal "point_difference"
# t.decimal "round_number"

RSpec.describe User, type: :model do
  describe "part_1_payment" do
    it "calculates payment based off of starting cash - point difference" do
      group = Group.create(name: "something")
      user = User.create(group: group)
      functionSet1 = FunctionSet.create()
      function = Function.create(function_set: functionSet1)
      function1 = Function.create(function_set: functionSet1)
      function2 = Function.create(function_set: functionSet1)

      FunctionResponse.create(user: user, point_difference: 0.43, part: :part_1, function: function)
      FunctionResponse.create(user: user, point_difference: 0.32, part: :part_1, function: function1)
      FunctionResponse.create(user: user, point_difference: 0.31, part: :part_1, function: function2)

      expect(user.part_1_payment.to_f).to eq(30 - 0.43 - 0.32 - 0.31)
    end
  end

  describe "part_2_payment" do
    describe "when user is a expert" do
      it "when salary" do
        group = Group.create(name: "something", default_payment: :salary, salary_payment: 30)
        expert = User.create(role: "A", group: group)
        customer = User.create(role: "B", group: group)
        pair = UserPair.create(expert: expert, customer: customer, round: 1)

        FunctionResponse.create(user: expert, point_difference: 0.43, part: :part_2, round_number: 1, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.32, part: :part_2, round_number: 2, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_2, round_number: 1, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_2, round_number: 2, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))

        expect(expert.part_2_payment).to eq(30)
      end

      it "when ffs" do
        group = Group.create(name: "something", default_payment: :ffs, ffs_payment: 1.01)
        expert = User.create(role: "A", group: group)
        customer = User.create(role: "B", group: group)
        pair = UserPair.create(expert: expert, customer: customer, round: 1)
        pair2 = UserPair.create(expert: expert, customer: customer, round: 2)

        FunctionResponse.create(user: expert, point_difference: 0.43, part: :part_2, round_number: 1, num_bought_value_coordinates: 2, num_bought_sample_points: 3, max_value_prediction: 1, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.32, part: :part_2, round_number: 2, num_bought_value_coordinates: 1, num_bought_sample_points: 3, max_value_prediction: 1, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_1, round_number: 1, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_1, round_number: 0, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        
        #group.ffs_payment * data_requests + num_predictions * group.ffs_payment * 3

        expect(expert.part_2_payment).to eq(1.01 * 9 + 2 * (1.01 * 3))
      end

      it "when capitation" do
        group = Group.create(name: "something", default_payment: :capitation, capitation_payment: 1.51)
        expert = User.create(role: "A", group: group)
        customer = User.create(role: "B", group: group)
        pair = UserPair.create(expert: expert, customer: customer, round: 2)
        pair2 = UserPair.create(expert: expert, customer: customer, round: 1)
        functionSet1 = FunctionSet.create()
        functionSet2 = FunctionSet.create()
        functionSet3 = FunctionSet.create()
        function1 = Function.create(function_set: functionSet1)
        function2 = Function.create(function_set: functionSet1)
        function3 = Function.create(function_set: functionSet2)
        function4 = Function.create(function_set: functionSet3)


        FunctionResponse.create(user: expert, point_difference: 0.43, part: :part_2, round_number: 0, max_value_prediction: 2, function: function4)
        FunctionResponse.create(user: expert, point_difference: 0.32, part: :part_2, round_number: 2, max_value_prediction: 2, function: function1)
        FunctionResponse.create(user: expert, point_difference: 0.32, part: :part_2, round_number: 2, max_value_prediction: 2, function: function2)
        FunctionResponse.create(user: expert, point_difference: 0.32, part: :part_2, round_number: 2, max_value_prediction: 2, function: function3)
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_2, round_number: 4, max_value_prediction: 2, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_2, round_number: 4, max_value_prediction: 2, function: create(:function))

        #num_uniq_group_responses * group.capitation_payment
        expect(expert.part_2_payment).to eq(1.51 * 2.0)
      end
    end

    describe "when user is a customer" do
      it "calculates payment based off of starting cash - point different of relating experts predictions - cost of points" do

        group = Group.create(name: "something", default_payment: :salary, salary_payment: 30)
        expert = User.create(role: "A", group: group)
        customer = User.create(role: "B", group: group)
        pair = UserPair.create(expert: expert, customer: customer, round: 1)
        
        FunctionResponse.create(user: expert, point_difference: 0.43, part: :part_2, round_number: 1, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.32, part: :part_2, round_number: 2, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_2, round_number: 1, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
        FunctionResponse.create(user: expert, point_difference: 0.31, part: :part_2, round_number: 2, num_bought_value_coordinates: 2, num_bought_sample_points: 3, function: create(:function))
   
        expect(customer.part_2_payment).to eq(30 - 0.43 - 0.31)
      end
    end
  end
end
