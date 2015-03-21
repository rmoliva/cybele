Cybele::Application.config.middleware.use ExceptionNotification::Rack,
  :email => {
    :email_prefix => "[CYBELE] ",
    :sender_address => %{"notifier" <noreply@lciberica.es>},
    :exception_recipients => %w{roliva@lciberica.es}
  }
