NS('AdminJS.components.adminjs.login');

AdminJS.components.adminjs.login.ForgotPassword = React.createClass({
  
  render: function() {
    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong class='text-skin'>{t("login.forgot_password")}</strong>
            </div>
  
            <form>
              <div className="form-group m-bottom-md">
                <input type="text" className="form-control" placeholder={t('login.email_address')} />
              </div>
  
              <div className="m-top-md p-top-sm">
                <a href="index.html" className="btn btn-success block">{t('login.send')}</a>
              </div>
  
              <div className="m-top-md p-top-sm">
                <div className="font-12 text-center m-bottom-xs">
                  <a href="#" className="font-12">{t('login.access')}</a>
                </div>
              </div>
            </form>
        </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
      </div>
    );
  }
});
