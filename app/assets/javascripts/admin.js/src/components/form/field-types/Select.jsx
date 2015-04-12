NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.Select = React.createClass({
  mixins: [AdminJS.components.form.FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    var options = config.data.options.map(function(option) {
      return <option value={option.value} key={option.value}>{option.name}</option>;
    });
    return (
      <div className="form-group">
        <label>
          {config.data.label}
          <select value={model[key]} className="form-control" onChange={this.onChange}>
            {options}
          </select>
        </label>
      </div>
    );
  }
});
