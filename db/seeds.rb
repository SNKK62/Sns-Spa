# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do |n|
    name = Faker::Name.name
    User.create(name: name, password: 'password',password_confirmation: 'password')

end

users = User.all

users.each do |user|
    content = Faker::Lorem.sentence(word_count: 6)
    user.posts.create(content: content)
end
