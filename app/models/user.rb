class User < ApplicationRecord
    attr_accessor :remember_token
    has_many :posts
    has_many :relationships
    has_many :followings, through: :relationships, source: :follow
    has_many :revrese_of_relatonships, class_name: 'Relationship',foreign_key: 'follow_id'
    has_many :followers, through: :revrese_of_relatonships, source: :user

    validates :name, presence: true, uniqueness: true
    has_secure_password
    # validates :password, presence: true ,length: {minimum: 6 }
    mount_uploader :img, ImgUploader

    def follow(other_user)
        unless self == other_user
            self.relationships.find_or_create_by(follow_id: other_user.id)
        end
    end

    def unfollow(other_user)
        relationship = self.relationships.find_by(follow_id: other_user.id)
        relationship.destroy if relationship
    end

    def following?(other_user)
        self.followings.include?(other_user)
    end 

    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    def User.new_token
        SecureRandom.urlsafe_base64
    end

    def remember
        self.remember_token = User.new_token
        update_attribute(:remember_digest,User.digest(remember_token))
    end

    def authenticated?(remember_token)
        return false if remember_digest.nil?
        BCrypt::Password.new(remember_digest).is_password?(remember_token)
    end

    def forget
        update_attribute(:remember_digest,nil)
    end
end
