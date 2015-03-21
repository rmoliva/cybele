module ExtJsRendererController
  extend ::ActiveSupport::Concern

  included do
  end

  module ClassMethods
  end

  def extjs_render_data format, data, total
    format.json do
      data = data.respond_to?(:as_api_response) ? data.as_api_response(params[:tpl] || :base) : data
      render json: {success: true, total: (total || 1), data: data}, :content_type => "application/json", :status => 200, :layout => false
    end
  end

  def extjs_render_exception format, exception
    Rails.logger.debug "EXCEPTION: #{exception.message}"
    exception.backtrace.each { |line| Rails.logger.debug line }
    format.json do
      render json: {success: false, message: exception.message}, :content_type => "application/json", :status => 200, :layout => false
    end
  end

  def extjs_render &block
    respond_to do |format|
      begin 
        data, total = yield
        extjs_render_data format, data, total
      rescue Exception => exception
        extjs_render_exception format, exception
      end
    end
  end
end # ExtJsRendererController
