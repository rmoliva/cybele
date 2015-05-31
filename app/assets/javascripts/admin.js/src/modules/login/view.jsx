NS('AdminJS.modules.login');
NS('AdminJS.lib');

AdminJS.modules.login.View = React.createClass({
  mixins: [AdminJS.lib.ModelMixin],
  
  _handleSignIn: function(data) {
    this.props.controller.call("handleSignIn", data);
  },
  
  _handleForgotPassword: function() {
    this.props.controller.call("handleForgotPassword");
  },
  
  _handleRegister: function() {
    this.props.controller.call("handleRegister");
  },
  
  _renderLogin: function() {
    return <AdminJS.modules.login.login.Login 
      email={this.state.email} 
      remember_me={this.state.remember_me}
      handleSignIn={this._handleSignIn}
      handleForgotPassword={this._handleForgotPassword} 
      handleRegister={this._handleRegister}
    />
  },
  
  _renderForgotPassword: function() {
    return <AdminJS.modules.login.login.ForgotPassword model={this.props.model} controller={this.props.controller} />
  },

  _renderRegister: function() {
    return <AdminJS.modules.login.login.Register model={this.props.model} controller={this.props.controller} />
  },

  render: function() {
    switch(this.state.state) {
      case 'login':
        return (<div id="login_module">{this._renderLogin()}</div>) 
      case 'forgot_password': 
        return (<div id="login_module">{this._renderForgotPassword()}</div>) 
      case 'register': 
        return (<div id="login_module">{this._renderRegister()}</div>) 
    };
  }
});
