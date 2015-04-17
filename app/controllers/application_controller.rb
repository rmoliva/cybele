class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :get_locale

  # http://stackoverflow.com/questions/14734243/rails-csrf-protection-angular-js-protect-from-forgery-makes-me-to-log-out-on
  after_action :set_csrf_cookie_for_ng
  before_action :set_locale

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
    [:id, "_dc", :tpl, :page, :start, :per_page, :app, :entity_id, :locale, :format, :user, {sort: [:property, :direction]}] << params
  end
  
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
  
  def verified_request?
    super || valid_authenticity_token?(session, cookies["XSRF-TOKEN"])
  end
  
end
