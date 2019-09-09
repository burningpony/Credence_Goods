class UserPair < ApplicationRecord

    belongs_to :expert, class_name: "User", foreign_key: "person_a_id", optional: true
    belongs_to :customer, class_name: "User", foreign_key: "person_b_id", optional: true
    
    scope :free_person_a, -> (group_id) { where(:person_a_id => [nil,""] ).where(:group_id => group_id).take(1) }
    scope :free_person_b, -> (group_id) { where(:person_b_id => [nil,""] ).where(:group_id => group_id).take(1) }
    scope :has_pair, -> (user_id) { where(:person_b_id => user_id).or(where(:person_a_id => user_id)).count  }



    def self.request_pair(user_id,round,group_id)
        #group = Group.find(user[:group_id])
        user = User.find(user_id)
        if(UserPair.has_pair(user.id) == 0)
            if user.role == 'A'
                pair = UserPair.free_person_a(group_id)
                role = :person_a_id
            else
                pair = UserPair.free_person_b(group_id)
                role = :person_b_id
            end
            #byebug
            if pair.count == 0
                puts 'creo el par'
                pair = UserPair.create(role => user.id, :round => round, :group_id => group_id)
                if pair.save
                    return pair
                else
                    puts pair.errors.full_messages
                end
            end
            
            pair = pair.first
            pair.update(role => user.id)
            pair.save

            return pair
        end
    end


end
