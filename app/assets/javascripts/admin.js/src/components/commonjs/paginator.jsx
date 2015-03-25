NS('CommonJS.components');

CommonJS.components.Paginator = React.createClass({
  propTypes: {
    page: React.PropTypes.number,
    page_count: React.PropTypes.number,
    size: React.PropTypes.oneOf(['large', 'small', 'normal']),
    limit: React.PropTypes.number,
      onClickPage: React.PropTypes.func
  },
  _onPageClick: function(e) {
    var page = $(e.currentTarget).data("page");
      e.preventDefault();
    this.props.onClickPage(page);
  },
    _paginatorClass: function(props) {
    switch(props.size) {
      case "small": 
  return "pagination pagination-sm";
      case "large":
  return "pagination pagination-lg";
    }
    return "pagination"
  },
  _renderNav: function(props) {
    // Si falta algun dato de paginacion no mostrarlo
    if(!props.page_count || !props.page) {
      return false;
      }
    // Si no hay paginas, o solo hay una no mostrar navegador
    if(props.page_count <= 1) {
      return false;
    }
    return true;
    },
  _previousLink: function(props) {
    if(this._renderNav(props)) {
      var cn = (props.page === 1 ? "disabled" : "");
      return <li key={0} className={cn}>
              <a href="#" data-page='1' onClick={this._onPageClick}>
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a></li>;
          }
  },  
  _nextLink: function(props) {
    if(this._renderNav(props)) {
      var cn = (props.page === props.page_count ? "disabled" : ""),
  next_page = (props.page === props.page_count ? props.page_count : props.page + 1),
  key;
      if(props.limit) {
  key = props.limit + 1;
            } else {
  key = props.page_count + 1;
      }
      return <li key={key} className={cn}>
              <a href="#" data-page={next_page} onClick={this._onPageClick}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a></li>;
    }
  },
  _mediumLink: function(props) {
    var leftCount, rightCount, start, limit, cn, i = 0, links = [];
      if(this._renderNav(props)) {
      if(props.limit) {
        limit = parseInt(props.limit, 10);
        leftCount = Math.ceil(limit / 2) - 1;
        rightCount = (limit - leftCount - 1);
        if (props.page + rightCount > props.page_count) {
          leftCount = (limit - (props.page_count - props.page) - 1);
        }
        if (props.page - leftCount < 1) {
          leftCount = props.page - 1;
        }
        start = props.page - leftCount;
        while (i < limit && i < props.page_count) {
          links.push({
            className: (start === props.page ? "active" : ""),
            current: (start === props.page),
            page: start
          });
          start++;
          i++;
        }
      } else {
        for (i = 1; i <= props.page_count; i++) {
          links.push({
            className: (i === props.page ? "active" : ""),
            current: (i === props.page),
            page: i
          });
        }
      }
      return _.map(links, function(link) {
        var current, on_click; 
        if(link.current) {
          current = <span className="sr-only">(current)</span>;
        } else {
          on_click = this._onPageClick;
        }
        return <li key={link.page} className={link.className}><a href="#" data-page={link.page} onClick={on_click}>{link.page}{current}</a></li>;
      }, this);
    } // renderNav
    },
 
    render: function() {
      if(this._renderNav(this.props)) {
        return <nav>
            <ul className={this._paginatorClass(this.props)}>
              {this._previousLink(this.props)}
              {this._mediumLink(this.props)}
              {this._nextLink(this.props)}
            </ul>
          </nav>;
      } else {
        return <div />;
     }
   }
});
