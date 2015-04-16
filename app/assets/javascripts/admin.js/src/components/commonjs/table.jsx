NS('CommonJS.components');

CommonJS.components.Table = React.createClass({
  _keyAttribute: function() {
    return (this.props.keyAttribute || 'id');
  },
  
  _keyValue: function(record) {
    return record[this._keyAttribute()];
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
        return <td>{row[column.key]}</td>;
      }, this),
      key = this._keyValue(row);
    return <tr key={key}>{cells}</tr>;
  },
  
  render: function() {
     var table_classes = classNames({
        table: true,
        "table-hover": this.props.hover,
        "table-condensed": this.props.condensed
      }), 
      head = this._renderHeader(),
      body = this._renderBody();
     
      return <table className={table_classes}>
        {head}
        {body}
      </table>;
   }
});
