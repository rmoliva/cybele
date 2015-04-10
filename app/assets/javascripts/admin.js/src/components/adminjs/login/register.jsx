NS('AdminJS.components.adminjs.login');

AdminJS.components.adminjs.login.Register = React.createClass({
  getInitialState: function() {
    return {
      email_value: null, 
      password_value: null,
      password_confirmation_value: null
    };
  },

  onClickLogin: function() {
    this.props.handleLogin();
  },
  
  onSendRegister: function() {
    this.props.handleSendRegister(this.state);
  },
  
  handleEmailChange: function(event) {
    this.setState({email_value: event.target.value});
  },  
  
  handlePasswordChange: function(event) {
    this.setState({password_value: event.target.value});
  },
  
  handlePasswordConfirmationChange: function(event) {
    this.setState({password_confirmation_value: event.target.value});
  },
  
  render: function() {
    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong className='text-skin'>{t("login.register")}</strong>
            </div>
  
            <form>
              <div className="form-group m-bottom-md">
                <input type="text" className="form-control" placeholder={t('login.email_address')} value={this.state.email_value} onChange={this.handleEmailChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder={t('login.password')} value={this.state.password_value} onChange={this.handlePasswordChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder={t('login.repeat_password')} value={this.state.password_confirmation_value} onChange={this.handlePasswordConfirmationChange} />
              </div>
    
              <div className="m-top-md p-top-sm">
                <a onClick={this.onSendRegister} className="btn btn-success block">{t('login.send')}</a>
              </div>
  
              <div className="m-top-md p-top-sm">
                <div className="font-12 text-center m-bottom-xs">{t('login.you_already_have_an_account')}</div>
                <a onClick={this.onClickLogin} className="btn btn-default block">{t('login.sign_in')}</a>
              </div>
            </form>
        </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
      </div>
    );
  }
});
