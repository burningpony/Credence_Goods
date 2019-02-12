class CreateFunctionSets < ActiveRecord::Migration[5.2]
  def change
    create_table :function_sets do |t|
      t.belongs_to :group, index: true
      t.timestamps
    end
  end
end
