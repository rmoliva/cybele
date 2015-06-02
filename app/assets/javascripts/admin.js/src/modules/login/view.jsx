NS('AdminJS.modules.login');
NS('AdminJS.lib');

AdminJS.modules.login.View = React.createClass({
  
  _handleSignIn: function(data) {
    this.props.controller.call("handleSignIn", data);
  },
  
  _handleForgotPassword: function() {
    this.props.controller.call("handleForgotPassword");
  },
  
  _handleRegister: function() {
    this.props.controller.call("handleRegister");
  },
  
  _handleLogin: function() {
    this.props.controller.call("handleLogin");
  },

  _handleSendPassword: function(data){
    this.props.controller.call("handleSendPassword", data);
  },
  
  _handleSendRegister: function(data) {
     this.props.controller.call("handleSendRegister",data);
  },
  
  _renderLogin: function() {
    var cursor = this.props.model.cursor();
    return <AdminJS.modules.login.login.Login 
      email={cursor.get('email')} 
      remember_me={cursor.get('remember_me')}
      spinner={cursor.get('spinner')} 
      handleSignIn={this._handleSignIn}
      handleForgotPassword={this._handleForgotPassword} 
      handleRegister={this._handleRegister}
    />
  },
  
  _renderForgotPassword: function() {
    return <AdminJS.modules.login.login.ForgotPassword
      handleLogin={this._handleLogin}
      handleSendPassword={this._handleSendPassword}
    />
  },

  _renderRegister: function() {
    return <AdminJS.modules.login.login.Register       
      handleLogin={this._handleLogin}
      handleSendRegister={this._handleSendRegister}
    />
  },

  render: function() {
    var state = this.props.model.cursor().get('state');
    
    switch(state) {
      case 'login':
        return (<div id="login_module">{this._renderLogin()}</div>) 
      case 'forgot_password': 
        return (<div id="login_module">{this._renderForgotPassword()}</div>) 
      case 'register': 
        return (<div id="login_module">{this._renderRegister()}</div>) 
    };
  }
});
