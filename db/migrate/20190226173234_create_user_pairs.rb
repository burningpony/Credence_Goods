class CreateUserPairs < ActiveRecord::Migration[5.2]
  def change
    create_table :user_pairs do |t|
      t.integer :round
      t.references :person_a, index: true, foreign_key: {to_table: :users}
      t.references :person_b, index: true, foreign_key: {to_table: :users}
      t.belongs_to :group, index: true
      t.timestamps
    end
  end
end
