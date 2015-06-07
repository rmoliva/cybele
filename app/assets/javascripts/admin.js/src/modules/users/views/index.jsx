NS('AdminJS.modules.users.views');

AdminJS.modules.users.views.Index = React.createClass({
  // TODO: mixins: [Omniscient.shouldComponentUpdate],
  
  _handleNew: function() {
    this.props.handleNew();
  },
  
  _handleEdit: function(options) {
    this.props.handleEdit(options);
  },

  _handleDelete: function(options) {
    this.props.handleDelete(options);
  },

  _handlePageClick: function(page) {
    this.props.handlePageClick({page: page});
  },
  
  _renderTable: function(columns, records) {
    // A las columnas añadirles los primeros botones de edicion y borrado
    var cols = [{
      key: 'btn',
      text: '',
      renderer: _.bind(function(row, key) {
        return <div> 
            <button type="button" className="btn btn-warning btn-xs" data-toggle='tooltip' data-placement="top" onClick={this._handleEdit.bind(this, {id: row.id})} title={t("update")}>
              <i className="fa fa-save"></i>
            </button>
            <button type="button" className="btn btn-danger btn-xs" data-toggle='tooltip' data-placement="top" onClick={this._handleDelete.bind(this, {id: row.id})} title={t("delete")}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>;
      }, this),
      align: 'center',
      width: '10%'
    }];
    
    return <CommonJS.components.Table
      columns = {cols.concat(columns)} 
      records = {records}
      condensed={true}
      hover={true}
      keyAttribute="name"
      onCellClick={this.props.onCellClick}
    />;
  },
  _renderPaginator: function(options) {
    return <div className="row">
      <div className="col-xs-6">
        <CommonJS.components.PaginatorLegend
            page={options.page}
            page_count={options.page_count} 
            per_page={options.per_page} 
            total={options.total}
        />
      </div>
      <div className="col-xs-6">
        <div className="pull-right">
          <CommonJS.components.Paginator 
            page={options.page}
            page_count={options.page_count} 
            size='normal' 
            limit={3} 
            onClickPage={this._handlePageClick}
          />
        </div>
      </div>
    </div>;
  },
  render: function() {
    var spinner_style = (this.props.loading_spinner ? {} : {display: "none"}),
      paginator = this._renderPaginator({
        page: this.props.page, 
        page_count: this.props.page_count, 
        per_page: this.props.per_page, 
        total: this.props.total
      }), 
      records = this.props.records,
      columns = this.props.columns,
      table = this._renderTable(columns, records);
    
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="filterToolbar">
          
          
          
          
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-sm-12">
            <div className="buttonToolbar">
          
          
          
          
            </div>
          </div>
        </div>
  
        <div className="smart-widget">
          {/* 
          <div className="smart-widget-header">
            <button type="submit" className="btn btn-primary marginTB-xs" onClick={this._handleToolbar('add')}>{t("add")}</button>
            <button type="submit" className="btn btn-warning marginTB-xs" onClick={this._handleToolbar('add')}>{t("update")}</button>
            <button type="submit" className="btn btn-danger marginTB-xs" onClick={this._handleToolbar('add')}>{t("delete")}</button>
            <span className="smart-widget-option">
              <a className="widget-toggle-hidden-option" style={spinner_style}>
                  <i className="fa fa-circle-o-notch fa-spin"></i>
              </a>
            </span>
          </div>
          
          */}
          <div className="smart-widget-inner">
            <div className="smart-widget-body">
              {table}
              {paginator}
            </div>
          </div>
        </div>
          
          
        <div className="row">
          <div className="col-sm-12">
            <div className="navigatorToolbar">
          
          
          
          
            </div>
          </div>
        </div>
      </div>
    );
  }
});
