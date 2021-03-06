# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_12_035803) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "function_responses", force: :cascade do |t|
    t.bigint "function_id"
    t.bigint "user_id"
    t.decimal "num_bought_value_coordinates"
    t.decimal "num_bought_sample_points"
    t.decimal "max_value_prediction"
    t.integer "part"
    t.time "time_to_response"
    t.decimal "point_difference"
    t.decimal "round_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["function_id"], name: "index_function_responses_on_function_id"
    t.index ["user_id", "function_id", "part", "round_number"], name: "function_response_uniqueness", unique: true
    t.index ["user_id"], name: "index_function_responses_on_user_id"
  end

  create_table "function_sets", force: :cascade do |t|
    t.string "name"
    t.bigint "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_function_sets_on_group_id"
  end

  create_table "functions", force: :cascade do |t|
    t.bigint "function_set_id"
    t.string "string_representation_of_function"
    t.decimal "min_x"
    t.decimal "min_y"
    t.decimal "max_x"
    t.decimal "max_y"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["function_set_id"], name: "index_functions_on_function_set_id"
  end

  create_table "groups", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.decimal "salary_payment", precision: 8, scale: 2, default: "24.0", null: false
    t.decimal "capitation_payment", precision: 8, scale: 2, default: "0.65", null: false
    t.decimal "ffs_payment", precision: 8, scale: 2, default: "0.2", null: false
    t.integer "number_of_rounds", default: 1, null: false
    t.integer "default_payment", default: 1, null: false
  end

  create_table "quiz_responses", force: :cascade do |t|
    t.bigint "user_id"
    t.jsonb "responses"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_quiz_responses_on_user_id"
  end

  create_table "user_pairs", force: :cascade do |t|
    t.integer "round"
    t.bigint "person_a_id"
    t.bigint "person_b_id"
    t.bigint "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_user_pairs_on_group_id"
    t.index ["person_a_id", "person_b_id", "round"], name: "user_pair_uniqueness", unique: true
    t.index ["person_a_id"], name: "index_user_pairs_on_person_a_id"
    t.index ["person_b_id"], name: "index_user_pairs_on_person_b_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "group_id"
    t.string "role"
    t.datetime "finished_at"
    t.index ["group_id"], name: "index_users_on_group_id"
  end

  add_foreign_key "user_pairs", "users", column: "person_a_id"
  add_foreign_key "user_pairs", "users", column: "person_b_id"
end
