ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    table_for User.where("finished_at is not null").order(finished_at: desc) do
      column "Id",     :id
      column "Total Payment",   :total_payment
      column "Part A Payment", :part_a_payment
      column "Part B Payment", :part_b_payment
      column "Part B Role",   :role_name
      column "Part B Configured Payment", :default_payment
    end
  end
end
