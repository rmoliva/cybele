NS('AdminJS.modules.users');

AdminJS.modules.users.View = React.createClass({
  // Currying the dispatcher
  _handleDipatcher: function(action, options) {
    return _.bind(function(options) {
      this.props.dispatcher.dispatch({
        action: action,
        options: options
      });
    }, this);
  },

  _renderIndex: function() {
    var model = this.props.model,
      page = model.page, 
      page_count = model.page_count, 
      per_page = model.per_page, 
      total = model.total,
      records = model.records;
    
    return <AdminJS.modules.users.views.Index
      handleNew={this._handleDipatcher("new")}
      handleEdit={this._handleDipatcher("edit")}
      handleDelete={this._handleDipatcher("delete")}
      handlePageClick={this._handleDipatcher("page")}
      page={page}
      page_count={page_count} 
      per_page={per_page} 
      total={total}
      records={records}
      // loading_spinner = {loading_spinner}
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
      onCellClick={this._handleDipatcher("show")}
    />
  },
  
  _renderShow: function() {
    return <AdminJS.modules.users.views.Show
      {...this.props}
      handleEdit={this._handleDipatcher("edit")}
      handleDelete={this._handleDipatcher("delete")}
      handleCancel={this._handleDipatcher("cancel")}
    />;
  },

  _renderNew: function() {
    return <AdminJS.modules.users.views.New
      handleCreate={this._handleDipatcher("create")}
      handleCancel={this._handleDipatcher("cancel")}
    />;
  },
  
  _renderEdit: function() {
    return <AdminJS.modules.users.views.Edit
      handleUpdate={this._handleDipatcher("update")}
      handleDelete={this._handleDipatcher("delete")}
      handleCancel={this._handleDipatcher("cancel")}
    />;
  },

  _renderDelete: function() {
    return <AdminJS.modules.users.views.Delete
      handleDestroy={this._handleDipatcher("destroy")}
      handleCancel={this._handleDipatcher("cancel")}
    />;
  },
  
  _renderSpinner: function() {
    if(this.props.model.spinner) {
      return <span className="refresh-icon-animated">
        <i className="fa fa-circle-o-notch fa-spin"></i>
      </span>;
    }
  },
  
  _renderToolbar: function() {
    // La barra de herramientas debe cambiar dependiendo de la vista
    return <div className="col-sm-6 text-right text-left-sm p-top-sm">
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-cog" /><span className="caret"></span>
        </button>
        <ul className="dropdown-menu pull-right" role="menu">
          <li><a onClick={this._handleDipatcher("new")}>{t("add")}</a></li>
        </ul>
      </div>
    </div>;      
  },
  
  _renderTitle: function() {
    var toolbar = this._renderToolbar(), 
      spinner = this._renderSpinner();
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
                  {spinner}
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
    var model = this.props.model,
      state = model.state,
      output = [],
      title = this._renderTitle();
      
    switch(state) {
      case 'index':
        output = this._renderIndex();
        break;
      case 'new_form':
        output = this._renderNew();
        break;
      case 'delete_form':
        output.push(this._renderDelete());
        output.push(this._renderIndex());
        break;
      case 'show_form':
        output = this._renderShow();
        break;
      case 'show_form-edit_form':
        output = this._renderEdit();
        break;
      case 'show_form-delete_form':
        output.push(this._renderDelete());
        output.push(this._renderShow());
        break;
      case 'edit_form':
        output = this._renderEdit();
        break;
      case 'edit_form-delete_form':
      case 'show_form-edit_form-delete_form':
        output.push(this._renderDelete());
        output.push(this._renderEdit());
        break;
     }
    return <div className="padding-md">
        {title}
        {output}
      </div>;
  }
});
