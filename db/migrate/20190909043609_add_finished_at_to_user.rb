class AddFinishedAtToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :finished_at, :datetime
  end
end
