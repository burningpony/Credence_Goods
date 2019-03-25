class User < ApplicationRecord
  scope :last_user_by_group_id, -> (group_id) { where(:group_id => group_id).order("created_at DESC").take(1) }

  belongs_to :group
end
