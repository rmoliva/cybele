NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Users = React.createClass({
  mixins: [AdminJS.lib.ModelMixin],
  
  _handleToolbar: function(command) {
    this.props.controller.call('handleToolbar', {cmd: command});
  },
  
  _handlePageClick: function(page) {
    this.props.controller.call('handlePageClick', {page: page});
  },
  
  render: function() {
    var spinner_style = (this.state.loading_spinner ? {} : {display: "none"})
    
    return (
      <div className="padding-md">
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
        
        <hr />
          
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
          <div className="smart-widget-inner">
            <div className="smart-widget-body">
              <CommonJS.components.Table 
                columns={[{
                  key: 'name',
                  text: t('users.name')
                }, {
                  key: 'surname',
                  text: t('users.surname')
                }, {
                  key: 'email',
                  text: t('users.email')
                }]}
                
                records = {this.state.records}
                
                condensed={true}
                hover={true}
                keyAttribute="name"
              />
              <div className="row">
                <div className="col-xs-6">
                  <CommonJS.components.PaginatorLegend
                      page={this.state.page}
                      page_count={this.state.page_count} 
                      per_page={this.state.per_page} 
                      total={this.state.total}
                  />
                </div>
                <div className="col-xs-6">
                  <div className="pull-right">
                    <CommonJS.components.Paginator 
                      page={this.state.page}
                      page_count={this.state.page_count} 
                      size='normal' 
                      limit={3} 
                      onClickPage={this._handlePageClick}
                    />
                  </div>
                </div>
              </div>
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
