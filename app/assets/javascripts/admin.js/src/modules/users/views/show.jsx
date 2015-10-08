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
  
  _renderData: function(data) {
    if(this.props.model.spinner) {
      return <span className="refresh-icon-animated">
        <i className="fa fa-circle-o-notch fa-spin"></i>
      </span>;
    } else {
      return data;
    }
  },
  
  _renderForm: function() {
    var model = this.props.model,
      selected = model.selected;
    if(selected) {
      return <dl className="dl-horizontal">
        <dt>Id</dt>
        <dd>{this._renderData(selected.id)}</dd>
        <dt>Name</dt>
        <dd>{this._renderData(selected.name)}</dd>
        <dt>Surname</dt>
        <dd>{this._renderData(selected.surname)}</dd>
        <dt>Gender</dt>
        <dd>{this._renderData(selected.gender)}</dd>
        <dt>Active</dt>
        <dd>{this._renderData(selected.active)}</dd>
        <dt>Address</dt>
        <dd>{this._renderData(selected.addres)}</dd>
        <dt>Postal Code</dt>
        <dd>{this._renderData(selected.postal_code)}</dd>
        <dt>State</dt>
        <dd>{this._renderData(selected.state)}</dd>
        <dt>City</dt>
        <dd>{this._renderData(selected.city)}</dd>
        <dt>Phone 1</dt>
        <dd>{this._renderData(selected.phone1)}</dd>
        <dt>Phone 2</dt>
        <dd>{this._renderData(selected.phone2)}</dd>
        <dt>Email</dt>
        <dd>{this._renderData(selected.email)}</dd>
        <dt>Email 2</dt>
        <dd>{this._renderData(selected.email2)}</dd>
      </dl>;
    }
  },
  
  render: function() {
    var form = this._renderForm();
    return (
      <div>
        <h1>
          Show
        </h1>
        {form}        
        <ReactBootstrap.Button onClick={this._handleCancel}>Cancel</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleEdit}>Edit</ReactBootstrap.Button>
        <ReactBootstrap.Button onClick={this._handleDelete}>Delete</ReactBootstrap.Button>
      </div>
    );
  }
});
