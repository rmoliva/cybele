NS('AdminJS.modules.users');

AdminJS.modules.users.View = React.createClass({
  // TODO: mixins: [Omniscient.shouldComponentUpdate],
  
  _handlePageClick: function(options) {
    this.props.controller.call('handlePageClick', options);
  },
  
  _handleNew: function(options) {
    return this.props.controller.call('handleNew', options);
  },

  _handleShow: function(options) {
    return this.props.controller.call('handleShow', options);
  },

  _handleCreate: function(options) {
    return this.props.controller.call('handleCreate', options);
  },

  _handleEdit: function(options) {
    return this.props.controller.call('handleEdit', options);
  },

  _handleUpdate: function(options) {
    return this.props.controller.call('handleUpdate', options);
  },

  _handleDelete: function(options) {
    return this.props.controller.call('handleDelete', options);
  },

  _handleDestroy: function(options) {
    return this.props.controller.call('handleDestroy', options);
  },
  
  _handleCancel: function(options) {
    return this.props.controller.call('handleCancel', options);
  },
  
  _onCellClick: function(options) {
    return this._handleShow(options);
  },

  _renderIndex: function() {
    var cursor= this.props.model.cursor(),
      page = cursor.get('page'), 
      page_count = cursor.get('page_count'), 
      per_page = cursor.get('per_page'), 
      total = cursor.get('total'),
      records = cursor.get('records'),
      loading_spinner = cursor.get('loading_spinner');
    
    return <AdminJS.modules.users.views.Index
      handleNew={this._handleNew}
      handleEdit={this._handleEdit}
      handleDelete={this._handleDelete}
      handlePageClick={this._handlePageClick}
      page={page}
      page_count={page_count} 
      per_page={per_page} 
      total={total}
      records={records}
      loading_spinner = {loading_spinner}
      columns={[{
        key: 'name',
        text: t('users.name'),
        align: 'center',
        width: 150
      }, {
        key: 'surname',
        text: t('users.surname'),
        align: 'center',
        width: 150
      }, {
        key: 'email',
        text: t('users.email'),
        align: 'center',
        width: 150
      }]}
      onCellClick={this._onCellClick}
    />
  },
  
  _renderShow: function() {
    return <AdminJS.modules.users.views.Show
      handleEdit={this._handleEdit}
      handleDelete={this._handleDelete}
      handleCancel={this._handleCancel}
    />;
  },

  _renderNew: function() {
    return <AdminJS.modules.users.views.New
      handleCreate={this._handleCreate}
      handleCancel={this._handleCancel}
    />;
  },
  
  _renderEdit: function() {
    return <AdminJS.modules.users.views.Edit
      handleUpdate={this._handleUpdate}
      handleDelete={this._handleDelete}
      handleCancel={this._handleCancel}
    />;
  },

  _renderDelete: function() {
    return <AdminJS.modules.users.views.Delete
      handleDestroy={this._handleDestroy}
      handleCancel={this._handleCancel}
    />;
  },
  
  _renderToolbar: function() {
    // La barra de herramientas debe cambiar dependiendo de la vista
    return <div className="col-sm-6 text-right text-left-sm p-top-sm">
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-cog" /><span className="caret"></span>
        </button>
        <ul className="dropdown-menu pull-right" role="menu">
          <li><a onClick={this._handleNew}>{t("add")}</a></li>
        </ul>
      </div>
    </div>;      
  },
  
  _renderTitle: function() {
    var toolbar = this._renderToolbar();
    return <div> 
        <div className="row">
          <div className="col-sm-6">
            <div className="clearfix">
              <div className="pull-left">
                <span className="img-demo bg-palette2">
                  <i className="block fa fa-users fa-lg"></i>
                </span>
                <div className="pull-left m-left-sm">
                  <h3 className="m-bottom-xs m-top-xs">{t("users.title")}</h3>
                </div>
              </div>
            </div>
          </div>
          {toolbar}
        </div>      
        <hr />
      </div>;
  },
  
  render: function() {
    var cursor = this.props.model.cursor(),
      state = cursor.get('state'),
      output = [],
      title = this._renderTitle();
      
    switch(state) {
      case 'index':
        output = this._renderIndex();
        break;
      case 'form_new':
        output = this._renderNew();
        break;
      case 'form_show':
        output = this._renderShow();
        break;
     }
        
/*      case 'form_edit':
        return this._renderEdit();
      case 'form_index_delete':
        output.push(this._renderDelete());
        output.push(this._renderIndex());
        return <div>{output}</div>;
      case 'form_edit_delete':
        output.push(this._renderDelete());
        output.push(this._renderEdit());
        return <div></div>;
    };
 */   
    return <div className="padding-md">
        {title}
        {output}
      </div>;
  }
});
