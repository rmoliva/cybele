NS('AdminJS.modules.users.views');

AdminJS.modules.users.views.Edit = React.createClass({
  // TODO: mixins: [Omniscient.shouldComponentUpdate],
  _handleUpdate: function() {
    this.props.handleUpdate();
  },
  _handleDelete: function() {
    this.props.handleDelete();
  },
  _handleCancel: function() {
    this.props.handleCancel();
  },
  
  render: function() {
    return (
      <div>
        <h1>Edit</h1>
        <ReactBootstrap.Button onClick={this._handleCancel}>Cancel</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleUpdate}>Update</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleDelete}>Delete</ReactBootstrap.Button>
      </div>
    );
  }
});
