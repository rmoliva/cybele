class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :get_locale
  before_filter :set_locale

  def default_url_options(options = {})
    { locale: get_locale }.merge options
  end

protected
  def get_locale
    I18n.locale
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def common_allowed_params params
    [:id, "_dc", :tpl, :page, :start, :limit, :app, :entity_id, :locale, :format, :user, {sort: [:property, :direction]}] << params
  end
end
