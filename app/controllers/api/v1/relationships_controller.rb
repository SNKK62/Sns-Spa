class Api::V1::RelationshipsController < ApplicationController
  # before_action :set_user
  skip_before_action :verify_authenticity_token

  
  def create 
    user = User.find(params[:id])
    following = current_user.follow(user)
    if following.save
      head :no_content
    else
      render json: {error: "failed to follow"},status: 422
    end
  end

  def destroy
    user = User.find(params[:id])
    following = current_user.unfollow(user)
    if following.destroy
      head :no_content
    else
      render json: {error: "failed to unfollow"}, status: 422
    end
  end

  private
  def set_user
    @user = User.find(params[:relationship][:follow_id])
  end

  
end
