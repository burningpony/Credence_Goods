# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
group = Group.create(name: "default")
set = FunctionSet.create!(name:"default set",group_id:group.id)
Function.create(function_set_id: set.id, string_representation_of_function: 'sin(x)',max_y: 1, max_x: 2, min_y: -1, min_x: -1)
Function.create(function_set_id: set.id, string_representation_of_function: 'cos(x)',max_y: 1, max_x: 2, min_y: -1, min_x: -1)
Function.create(function_set_id: set.id, string_representation_of_function: 'cos(x) * 2 / 4',max_y: 1, max_x: 2, min_y: -1, min_x: -1)
Function.create(function_set_id: set.id, string_representation_of_function: 'cos(x) * 2',max_y: 1, max_x: 2, min_y: -1, min_x: -1)