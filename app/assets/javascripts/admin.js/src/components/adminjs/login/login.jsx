NS('AdminJS.components.adminjs.login');

AdminJS.components.adminjs.login.Login = React.createClass({
  parsley: null, 

  getInitialState: function() {
    return {
      login_form: {},
      spinner: false
    };
  },
  
  onClickSignIn: function() {
    if(this.parsley.validate()) {
      this.props.controller.handleSignIn(this.state.login_form);
    }
  },
  
  onClickForgotPassword: function() {
    this.props.controller.handleForgotPassword();
  },
  
  onClickRegister: function() {
    this.props.controller.handleRegister();
  },

  componentDidMount: function() {
    var selector = this.refs.login_form.getDOMNode();
    this.parsley = $(selector).parsley();
    this.props.model.on.setted.add(this.onModelSetted);
  },
  
  onModelSetted: function(data) {
    var state = {};
    state[data.key] = data.value;
    this.setState(state);
    
    console.group("onModelSetted");
    console.log(data);
    console.log(state);
    console.log(this.state);
    console.groupEnd("onModelSetted");
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
        data: {
        },
        validate: {
          required: true
        }          
      }, {
        key: 'chkRemember',
        type: 'checkbox',
        placeholder: t('login.password'),
        data: {
          label: t('login.remember_me')
        }
      }]
    };
  },
  
  onFormlyUpdate: function(model) {
    this.setState({model: model});
  },
  
  render: function() {
    var spinner, 
      btn_classes = React.addons.classSet({
        btn: true,
        "btn-success": true,
        block: true,
        disabled: this.state.spinner
      });
    
    if(this.state.spinner) {
      spinner = <i className="fa fa-spinner fa-spin m-right-xs"></i>;
    }
    
    return (
      <div className="wrapper no-navigation preload">
        <div className="sign-in-wrapper">
          <div className="sign-in-inner">
            <div className="login-brand text-center">
              <i className="fa fa-database m-right-xs"></i>{t("brand")}<strong className='text-skin'>{t("login.access")}</strong>
            </div>
            
            <AdminJS.components.form.Formly ref="login_form" config={this.loginFormConfig()} model={this.state.login_form} onFormlyUpdate={this.onFormlyUpdate} />
  
            <div className="m-top-md p-top-sm">
              <a onClick={this.onClickSignIn} className={btn_classes}>
              {spinner}
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
