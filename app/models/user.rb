class User < ApplicationRecord
  STARTING_CASH = 30
  belongs_to :group
  has_many :customers, class_name: "UserPair", foreign_key: "person_b_id"
  has_many :experts, class_name: "UserPair", foreign_key: "person_a_id"
  has_many :function_responses
  scope :last_user_by_group_id, -> (group_id) { where(:group_id => group_id).order("created_at DESC").take(1) }

  def role_name
    if(role === "A")
      return "Expert"
    elsif(role === "B")
      return "Customer"
    end
  end

  def is_expert?
    role_name == "Expert"
  end

  def part_1_payment
    Part1.new(self).payment
  end

  def part_2_payment
    Part2.new(self).payment
  end

  def total_payment
    return part_1_payment + part_2_payment
  end

  private

  class Part1
    def initialize(user)
      @user = user
    end
    
    def payment
      STARTING_CASH - function_responses.sum(&:point_difference)
    end

    private

    def function_responses
      @user.function_responses.where(part: :part_1)
    end
  end

  class Part2
    def initialize(user)
      @user = user
    end

    def payment
      if(@user.is_expert?)
        if(group.capitation?) 
          return num_uniq_group_responses * group.capitation_payment
        elsif(group.salary?)
          return group.salary_payment
        elsif(group.ffs?)
          return group.ffs_payment * data_requests + num_predictions * prediction_payment
        end
      else 
        
        return STARTING_CASH - FunctionResponse.select('point_difference')
                                               .joins(user: :experts)
                                               .where('"user_pairs"."round" = "function_responses"."round_number"', 
                                                      user_pairs: {person_b_id: @user }, part: :part_2)
                                               .sum(&:point_difference)
                                         
      end
    end

    private

    def default_payment
      return group.default_payment
    end

    def group
      @user.group
    end

    def function_responses
      @user.function_responses.where(part: :part_2)
    end

    def num_uniq_group_responses
      function_responses.distinct.select(:function_set_id).joins(:function).where("max_value_prediction IS NOT NULL").count
    end
  
    def data_requests
      function_responses.sum(:num_bought_value_coordinates) + function_responses.sum(:num_bought_sample_points)
    end
  
    def num_predictions
      function_responses.where("max_value_prediction IS NOT NULL").count
    end
  
    #prediction_payment marked as 3 times the regular payment
    def prediction_payment
      group.ffs_payment * 3
    end
  end
end
