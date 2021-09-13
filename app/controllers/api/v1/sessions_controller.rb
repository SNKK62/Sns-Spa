class Api::V1::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  include SessionsHelper

  def create 
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
        log_in user 
        remember user
        render json: {"user": user, "success": true}
    else 
        render json: {"success": false}
    end
  end

  def destroy
    log_out if logged_in?
    head :no_content
  end

  def logged_in
    bool = logged_in?
    render json: {"bool": bool,"user": current_user}
  end

end
