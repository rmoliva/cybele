NS('AdminJS.modules.login.login');
NS('AdminJS.lib');

AdminJS.modules.login.login.Login = React.createClass({
  mixins: [AdminJS.lib.ParsleyMixin],
  
  onClickSignIn: function() {
    if(this.validate()) {
      this.props.handleSignIn({
        email: this.state.email,
        password: this.state.password,
        remember_me: this.state.remember_me
      });
    }
  },
  
  onClickForgotPassword: function() {
    this.props.handleForgotPassword();
  },
  
  onClickRegister: function() {
    this.props.handleRegister();
  },

  loginFormConfig: function() {
    return {
      name: 'login_form',
      fields: [{
        key: 'email',
        type: 'text',
        placeholder: t('login.email_address'),
        data: {
        },
        validate: {
          required: true,
          type: "email"
        }
      }, {
        key: 'password',
        type: 'text',
        placeholder: t('login.password'),
        password: true,
        data: {
        },
        validate: {
          required: true
        }          
      }, {
        key: 'remember_me',
        type: 'checkbox',
        placeholder: t('login.password'),
        data: {
          label: t('login.remember_me')
        }
      }]
    };
  },
  
  onFormlyUpdate: function(model) {
    this.setState(model);
  },
  
  render: function() {
    var spinner = this.props.spinner,
      spinner_html, 
      btn_classes = classNames({
        btn: true,
        "btn-success": true,
        block: true,
        disabled: spinner
      }), login_form_model;
    
    if(spinner) {
      spinner_html = <i className="fa fa-spinner fa-spin m-right-xs"></i>;
    }
    login_form_model = {
      email: this.props.email,
      password: null,
      remember_me: this.props.remember_me
    };

    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong className='text-skin'>{t("login.access")}</strong>
            </div>
            
          {/* <pre>{JSON.stringify(this.state)}</pre> */}
            
            <AdminJS.components.form.Formly ref="parsley_form" config={this.loginFormConfig()} model={login_form_model} onFormlyUpdate={this.onFormlyUpdate} />
  
            <div className="m-top-md p-top-sm">
              <a onClick={this.onClickSignIn} className={btn_classes}>
              {spinner_html}
              {t('login.sign_in')}
              </a>
            </div>

            <div className="m-top-md p-top-sm">
              <div className="font-12 text-center m-bottom-xs">
                <a onClick={this.onClickForgotPassword} className="font-12">{t('login.forgot_password')}</a>
              </div>
              <div className="font-12 text-center m-bottom-xs">{t('login.do_not_have_an_account')}</div>
              <a onClick={this.onClickRegister} className="btn btn-default block">{t('login.create_an_account')}</a>
            </div>
          </div>{/* ./sign-in-inner */}
        </div>{/* ./sign-in-wrapper */}
      </div>
    );
  }
});
