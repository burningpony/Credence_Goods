class CreateQuizResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :quiz_responses do |t|
      t.references :user, index: true
      t.jsonb :responses
      t.timestamps
    end
  end
end
