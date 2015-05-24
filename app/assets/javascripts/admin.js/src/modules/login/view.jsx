NS('AdminJS.modules.login');
NS('AdminJS.lib');

AdminJS.modules.login.View = React.createClass({
  mixins: [AdminJS.lib.ModelMixin],
  
  _renderLogin: function() {
    return <AdminJS.modules.login.login.Login model={this.props.model} />
  },
  
  render: function() {
    var r;
    switch(this.state.state) {
      case 'login': 
        r = this._renderLogin();
        break;
    };
    
    
    return (
      <div id="login_module">
        {r}
      </div>
    );
  }
});
