
module.exports = React.createClass({
  getInitialState: function() {
    return {
      email_value: null 
    };
  },

  onClickLogin: function() {
    this.props.controller.call("handleLogin");
  },
  
  onSendPassword: function() {
    this.props.controller.call("handleSendPassword", this.state);
  },
  
  handleEmailChange: function(event) {
    this.setState({email_value: event.target.value});
  },  

  render: function() {
    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong className='text-skin'>{t("login.forgot_password")}</strong>
            </div>
  
            <form>
              <div className="form-group m-bottom-md">
                <input type="text" className="form-control" placeholder={t('login.email_address')} value={this.state.email_value} onChange={this.handleEmailChange} />
              </div>
  
              <div className="m-top-md p-top-sm">
                <a  onClick={this.onSendPassword} className="btn btn-success block">{t('login.send')}</a>
              </div>
  
              <div className="m-top-md p-top-sm">
                <div className="font-12 text-center m-bottom-xs">
                  <a onClick={this.onClickLogin} className="font-12">{t('login.access')}</a>
                </div>
              </div>
            </form>
        </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
      </div>
    );
  }
});
