NS('AdminJS.components.adminjs.login');

AdminJS.components.adminjs.login.Register = React.createClass({
  
  render: function() {
    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong class='text-skin'>{t("login.register")}</strong>
            </div>
  
            <form>
              <div className="form-group m-bottom-md">
                <input type="text" className="form-control" placeholder={t('login.email_address')} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder={t('login.password')} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder={t('login.repeat_password')} />
              </div>
    
              <div className="m-top-md p-top-sm">
                <a href="index.html" className="btn btn-success block">{t('login.send')}</a>
              </div>
  
              <div className="m-top-md p-top-sm">
                <div className="font-12 text-center m-bottom-xs">{t('login.you_already_have_an_account')}</div>
                <a href="signup.html" className="btn btn-default block">{t('login.sign_in')}</a>
              </div>
            </form>
        </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
      </div>
    );
  }
});
