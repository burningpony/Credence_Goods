require 'rails_helper'

RSpec.describe UserPair, type: :model do
    describe "Pair Assignation" do

      it "Should return a pair return with the opposite role unassigned" do
        group = Group.create(name: "something")
        userA = User.create(group: group, role:  'A')
        pairA = UserPair.request_pair(userA.id,1,group.id)
        expect(pairA.person_b_id).to eq(nil)
      end

      it "Should match the pair id if the user roles are compatible" do
        group = Group.create(name: "something")
        userA = User.create(group: group, role:  'A')
        userB = User.create(group: group, role:  'B')
        pairA = UserPair.request_pair(userA.id,1,group.id)
        pairB = UserPair.request_pair(userB.id,1,group.id)
        expect(pairA.id).to eq(pairB.id)
      end

      it "Should match the pairs A-B D-C based on his roles" do
        group = Group.create(name: "something")
        userA = User.create(group: group, role:  'A')
        userB = User.create(group: group, role:  'B')
        userC = User.create(group: group, role:  'A')
        userD = User.create(group: group, role:  'B')

        pairA = UserPair.request_pair(userA.id,1,group.id)
        pairB = UserPair.request_pair(userB.id,1,group.id)
        pairC = UserPair.request_pair(userC.id,1,group.id)
        pairD = UserPair.request_pair(userD.id,1,group.id)

        expect(pairA.id).to eq(pairB.id)
        expect(pairC.id).to eq(pairD.id)
      end
      

    end
end
