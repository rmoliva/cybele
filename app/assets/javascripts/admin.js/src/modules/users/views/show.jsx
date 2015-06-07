NS('AdminJS.modules.users.views');

AdminJS.modules.users.views.Show = React.createClass({
  // TODO: mixins: [Omniscient.shouldComponentUpdate],
  
  _handleEdit: function() {
    this.props.handleEdit();
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
        <h1>Show</h1>
        <ReactBootstrap.Button onClick={this._handleCancel}>Cancel</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleEdit}>Edit</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleDelete}>Delete</ReactBootstrap.Button>
      </div>
    );
  }
});
