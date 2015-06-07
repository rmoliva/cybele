NS('CommonJS.components');

CommonJS.components.Table = React.createClass({
  _onCellClick: function(options) {
    this.props.onCellClick(options);
  },
  
  _keyAttribute: function() {
    return (this.props.keyAttribute || 'id');
  },
  
  _keyValue: function(record) {
    return record[this._keyAttribute()];
  },
  
  _renderColgroup: function() {
    var columns = this.props.columns, 
      colgroup = columns.map(function(column) {
        return <col key={column.key} align={column.align} width={column.width} />;
      }, this);
    return <colgroup>{colgroup}</colgroup>;
  },
  
  _renderHeader: function() {
    var columns = this.props.columns, 
      header = columns.map(function(column) {
        return <th key={column.key}>{column.text}</th>;
      }, this)
    return <thead><tr>{header}</tr></thead>;
  },
  
  _renderBody: function() {
    var records = this.props.records,
      rows = records.map(function(row) {
        return this._renderRow(row);
      }, this);
    return <tbody>{rows}</tbody>;
  },

  _renderRow: function(row) {
    var columns = this.props.columns,
      cells = columns.map(function(column) {
        return <td onClick={this._onCellClick.bind(this,{column: column, row: row})} key={column.key}>{this._renderCell(row,column.key)}</td>;
      }, this),
      key = this._keyValue(row);
    return <tr key={key}>{cells}</tr>;
  },
  
  _getColumn: function(key) {
    var index = _.findIndex(this.props.columns, function(column) {
      return column.key === key;
    }, this);
    return this.props.columns[index];
  },
  
  _renderCell: function(row, key) {
    var column = this._getColumn(key); 
    if(column.renderer) {
      return column.renderer.call(this, row, key);
    } else {
      return row[key];
    }
  },
  
  render: function() {
     var table_classes = classNames({
        table: true,
        "table-hover": this.props.hover,
        "table-condensed": this.props.condensed
      }), 
      colgroup,
      head,
      body;
     
      colgroup = this._renderColgroup();
      head = this._renderHeader();
      body = this._renderBody();
     
      return <table className={table_classes}>
        {colgroup}
        {head}
        {body}
      </table>;
   }
});
