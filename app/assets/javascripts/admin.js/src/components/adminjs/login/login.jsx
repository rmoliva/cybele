NS('AdminJS.components.adminjs.login');

AdminJS.components.adminjs.login.Login = React.createClass({
  
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
                <input type="text" className="form-control" placeholder={t('login.email_address')} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder={t('login.password')} />
              </div>
  
              <div className="form-group">
                <div className="custom-checkbox">
                  <input type="checkbox" id="chkRemember" />
                  <label forHtml="chkRemember"></label>
                </div>
                {t('login.remember_me')}
              </div>
  
              <div className="m-top-md p-top-sm">
                <a href="index.html" className="btn btn-success block">{t('login.sign_in')}</a>
              </div>
  
              <div className="m-top-md p-top-sm">
                <div className="font-12 text-center m-bottom-xs">
                  <a href="#" className="font-12">{t('login.forgot_password')}</a>
                </div>
                <div className="font-12 text-center m-bottom-xs">{t('login.do_not_have_an_account')}</div>
                <a href="signup.html" className="btn btn-default block">{t('login.create_an_account')}</a>
              </div>
            </form>
        </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
      </div>
    );
  }
});
