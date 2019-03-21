class UserPair < ApplicationRecord
    
    scope :free_person_a, -> (group_id) { where(:person_a_id => [nil,""] ).where(:group_id => group_id).take(1) }
    scope :free_person_b, -> (group_id) { where(:person_b_id => [nil,""] ).where(:group_id => group_id).take(1) }

    def self.request_pair(user_id,round,group_id)
        #group = Group.find(user[:group_id])
        user = User.find(user_id)
        if user.role == 'A'
            pair = UserPair.free_person_a(group_id)
            role = :person_a_id
        else
            pair = UserPair.free_person_b(group_id)
            role = :person_b_id
        end

        if pair.count == 0
            return UserPair.create(role => user.id, :round => round, :group_id => group_id)
        end
        pair = pair.first
        pair.update(role => user.id)
        pair.save

        return pair
    end


end
