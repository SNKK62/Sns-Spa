class Api::V1::PostsController < ApplicationController
  skip_before_action :verify_authenticity_token


    def index 
        posts = Post.order(updated_at: :desc)
        render json: posts
    end
 

    def show
        post = Post.find(params[:id])
        render json: post
    end

    def create
        post = current_user.posts.build(post_params)
        if post.save! 
            render json: post
        else
            render json: post.errors ,status: 422
        end
    end

    def update
        post = Post.find(params[:id])
        if post.update
            render json: post 
        else 
            render json: post.errors, status: 422
        end
    end

    def destroy
        if Post.destroy(params[:id])
            head :no_content
        else
            render json: {error: "failed to delete"}, status: 422
        end
    end

    private

    def post_params
        params.require(:post).permit(:content)
    end

end