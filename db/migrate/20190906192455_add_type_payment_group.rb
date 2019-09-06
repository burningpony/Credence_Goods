class AddTypePaymentGroup < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :default_payment, :integer, default: 1, null: false
  end
end
