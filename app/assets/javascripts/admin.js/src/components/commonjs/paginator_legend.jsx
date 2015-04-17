NS('CommonJS.components');

CommonJS.components.PaginatorLegend = React.createClass({
  propTypes: {
    page: React.PropTypes.number,
    page_count: React.PropTypes.number,
    per_page: React.PropTypes.number,
    total: React.PropTypes.number
  },
  _getPage: function() {
    return parseInt(this.props.page,10);
  },
  _getPageCount: function() {
    return parseInt(this.props.page_count,10);
  },
  _getPerPage: function() {
    return parseInt(this.props.per_page,10);
  },
  _getTotal: function() {
    return parseInt(this.props.total,10);
  },
  _renderNav: function() {
    var page = this._getPage(),
      page_count = this._getPageCount();
    // Si falta algun dato de paginacion no mostrarlo
    if(!page_count || !page) {
      return false;
    }
    // Si no hay paginas, o solo hay una no mostrar navegador
    if(page_count <= 1) {
      return false;
    }
    return true;
  },
  _from: function() {
    var page = (this._getPage() - 1);
    return (page * this._getPerPage()) + 1;
  },
  _to: function() {
    var page = this._getPage(), 
      to = (page * this._getPerPage()),
      total = this._getTotal();
    if(to > total) {
      return total;
    }
    return (page * this._getPerPage());
  },
  render: function() {
    if(this._renderNav()) {
      return <div className="dataTables_info" role="status" aria-live="polite">
        {t("paginator_legend.text", {from: this._from(), to: this._to(), total: this._getTotal()})}
      </div>;
    } else {
      return <div />;
    }
  }
});
