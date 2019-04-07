class AddRoundsToGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :number_of_rounds, :integer,default: 1,null: false, uniq: true
  end
end
