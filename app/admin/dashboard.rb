ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    table_for Payment.all do
      column "Expert",     :expert_payment_details
      column "Customer",   :customer_payment_details
    end

    table_for UserStatistics.all do
      column "Id",     :id
    end
  end
end
