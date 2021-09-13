class Api::V1::UsersController < ApplicationController
    # after_action :set_csrf_token_header
    protect_from_forgery 
    # skip_forgery_protection
    skip_before_action :verify_authenticity_token
    include SessionsHelper

    def index
        users = User.order(updated_at: :desc)
        render json: users
    end

    def show
        user = User.find(params[:id])
        login = logged_in?
        followcount = user.followings.count
        followedcount = user.followers.count
        render json: {"user": user, "logged_in": login,"current_user": current_user,"followcount": followcount, "followedcount": followedcount}
    end

    def posts
        user = User.find(params[:id])
        posts = user.posts
        render json: posts
    end

    def names 
        users = User.order(created_at: :desc)
        names = []
        users.each do |user|
            names.push(user.name)
        end
        render json: names
    end


    def create
        user = User.new(user_params)
        if user.save
            log_in user
            render json: user
        else
            render json: user.errors, status: 422
        end
    end

    def update
        user = User.find(params[:id])
        
        if user.update(user_params)
            render json: user
        else
            render json: user.errors, status: 422
        end
    end

    def destroy
        if User.destroy(params[:id])
            head :no_content
        else
            render json: {error: "Failed to destroy"}, status: 422
        end
    end

    def followings
        user = User.find(params[:id])
        followings = user.followings
        render json: followings
    end

    def followers
        user = User.find(params[:id])
        followers = user.followers
        render json: followers
    end

    def following
        if logged_in?
            other_user = User.find(params[:id])
            bool = current_user.following?(other_user)
            render json: {"bool": bool}
        else
            render json: {"bool": false}
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :password, :password_confirmation, :img)
    end
end
