NS('AdminJS.modules.users.views');

AdminJS.modules.users.views.New = React.createClass({
  // TODO: mixins: [Omniscient.shouldComponentUpdate],
  _handleCreate: function() {
    this.props.handleCreate();
  },
  _handleCancel: function() {
    this.props.handleCancel();
  },
  
  render: function() {
    return (
      <div>
        <h1>New</h1>
        <ReactBootstrap.Button onClick={this._handleCancel}>Cancel</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleCreate}>Create</ReactBootstrap.Button>
      </div>
    );    
    
  }
});
