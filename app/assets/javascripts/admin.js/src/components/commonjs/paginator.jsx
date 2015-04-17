NS('CommonJS.components');

CommonJS.components.Paginator = React.createClass({
  propTypes: {
    page: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    page_count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    size: React.PropTypes.oneOf(['large', 'small', 'normal']),
    limit: React.PropTypes.number,
    onClickPage: React.PropTypes.func
  },
  _onPageClick: function(page) {
    this.props.onClickPage(page);
  },
  _paginatorClass: function() {
    var props = this.props;
    switch(props.size) {
      case "small": 
      return "pagination pagination-sm";
      case "large":
      return "pagination pagination-lg";
    }
    return "pagination"
  },
  _getPage: function() {
    return parseInt(this.props.page,10);
  },
  _getPageCount: function() {
    return parseInt(this.props.page_count,10);
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
  _previousLink: function() {
    var page = this._getPage(),
      page_count = this._getPageCount(),
      on_click, cn;
    if(this._renderNav()) {
      on_click = (page === 1 ? null : this._onPageClick.bind(this,page-1));
      cn = (page === 1 ? "disabled" : "");
      return <li key={0} className={cn}>
        <a onClick={on_click}>
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">{t("previous")}</span>
        </a>
      </li>;
    }
  },  
  _nextLink: function() {
    var props = this.props,
      page = this._getPage(),
      page_count = this._getPageCount(),
      on_click;
    if(this._renderNav()) {
      var cn = (page === page_count ? "disabled" : ""),
        next_page = (page === page_count ? page_count : page + 1),
        on_click = (page === page_count ? null : this._onPageClick.bind(this, next_page)),
        key;
      if(props.limit) {
        key = props.limit + 1;
      } else {
        key = page_count + 1;
      }

      return <li key={key} className={cn}>
        <a onClick={on_click}>
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">{t("next")}</span>
        </a>
      </li>;
    }
  },
  _mediumLink: function() {
    var props = this.props,
      page = this._getPage(),
      page_count = this._getPageCount(),
      leftCount, rightCount, start, limit, cn, i = 0, links = [];
    if(this._renderNav()) {
      if(props.limit) {
        limit = parseInt(props.limit, 10);
        leftCount = Math.ceil(limit / 2) - 1;
        rightCount = (limit - leftCount - 1);
        if (page + rightCount > page_count) {
          leftCount = (limit - (page_count - page) - 1);
        }
        if (page - leftCount < 1) {
          leftCount = page - 1;
        }
        start = page - leftCount;
        while (i < limit && i < page_count) {
          links.push({
            className: (start === page ? "active" : ""),
            current: (start === page),
            page: start
          });
          start++;
          i++;
        }
      } else {
        for (i = 1; i <= page_count; i++) {
          links.push({
            className: (i === page ? "active" : ""),
            current: (i === page),
            page: i
          });
        }
      }
      return _.map(links, function(link) {
        var current, on_click; 
        if(link.current) {
          current = <span className="sr-only">(current)</span>;
        } else {
          on_click = this._onPageClick.bind(this, link.page);
        }
        return <li key={link.page} className={link.className}><a onClick={on_click}>{link.page}{current}</a></li>;
      }, this);
    } // renderNav
    },
 
    render: function() {
      if(this._renderNav()) {
        return <nav>
            <ul className={this._paginatorClass()}>
              {this._previousLink()}
              {this._mediumLink()}
              {this._nextLink()}
            </ul>
          </nav>;
      } else {
        return <div />;
     }
   }
});
