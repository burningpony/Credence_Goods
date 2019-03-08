class UserPair < ApplicationRecord
    
    scope :free, -> { where(:person_a_id => [nil,""] ).or(where(:person_b_id => [nil,""])).take(1) }
    
    def self.request_pair(user,round)
        #group = Group.find(user[:group_id])
        pair = UserPair.free()
        if pair.count == 0
            role = [:person_a_id , :person_b_id].sample
            return UserPair.create(role => user["id"], :round => round)
        end
        pair = pair.first
        pair.person_a_id.nil? ? pair.person_a_id = user["id"] :  pair.person_b_id = user["id"]
        pair.save
        return pair
    end


end
