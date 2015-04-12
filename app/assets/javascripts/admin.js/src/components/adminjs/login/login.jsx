NS('AdminJS.components.adminjs.login');

AdminJS.components.adminjs.login.Login = React.createClass({

  getInitialState: function() {
    return {
      email_value: null, 
      password_value: null
    };
  },
  
  onClickSignIn: function() {
    this.props.handleSignIn(this.state);
  },
  
  onClickForgotPassword: function() {
    this.props.handleForgotPassword();
  },
  
  onClickRegister: function() {
    this.props.handleRegister();
  },
  
  handleEmailChange: function(event) {
    this.setState({email_value: event.target.value});
  },  
  
  handlePasswordChange: function(event) {
    this.setState({password_value: event.target.value});
  },

  render: function() {
    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong className='text-skin'>{t("login.access")}</strong>
            </div>
  
            <form>
              <div className="form-group m-bottom-md">
                <input type="text" className="form-control" placeholder={t('login.email_address')} value={this.state.email_value} onChange={this.handleEmailChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder={t('login.password')} value={this.state.password_value} onChange={this.handlePasswordChange} />
              </div>
  
              <div className="form-group">
                <div className="custom-checkbox">
                  <input type="checkbox" id="chkRemember" />
                  <label forHtml="chkRemember"></label>
                </div>
                {t('login.remember_me')}
              </div>
  
              <div className="m-top-md p-top-sm">
                <a onClick={this.onClickSignIn} className="btn btn-success block">{t('login.sign_in')}</a>
              </div>
  
              <div className="m-top-md p-top-sm">
                <div className="font-12 text-center m-bottom-xs">
                  <a onClick={this.onClickForgotPassword} className="font-12">{t('login.forgot_password')}</a>
                </div>
                <div className="font-12 text-center m-bottom-xs">{t('login.do_not_have_an_account')}</div>
                <a onClick={this.onClickRegister} className="btn btn-default block">{t('login.create_an_account')}</a>
              </div>
            </form>
        </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
        <AdminJS.components.adminjs.login.form.Login />
      </div>
    );
  }
});
