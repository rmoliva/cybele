NS('AdminJS.modules.users.views');

AdminJS.modules.users.views.Delete = React.createClass({
  // TODO: mixins: [Omniscient.shouldComponentUpdate],
  
  _handleDestroy: function(command) {
    this.props.handleDestroy();
  },
  _handleCancel: function(command) {
    this.props.handleCancel();
  },
  render: function() {
    return (
      <ReactBootstrap.Modal title='Modal heading' onRequestHide={this._handleCancel}>
        <div className='modal-body'>
          This modal is controlled by our custom trigger component.
        </div>
        <div className='modal-footer'>
          <ReactBootstrap.Button onClick={this._handleDestroy}>Close</ReactBootstrap.Button>
        </div>
      </ReactBootstrap.Modal>
    );    
    
  }
});
