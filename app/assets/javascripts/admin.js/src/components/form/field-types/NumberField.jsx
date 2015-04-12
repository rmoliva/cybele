NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.NumberField = React.createClass({
  mixins: [AdminJS.components.form.FieldMixin],
  transformUpdate: function(value) {
    var newVal = value.replace(/\D/g,'');
    if (newVal.length) {
      return ~~newVal;
    } else {
      return '';
    }
  },
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    return (
      <div>
        <label>
          {config.data.label}
          <input className="form-control" type="text" name={key} value={model[key]} onChange={this.onChange} />
        </label>
      </div>
      );
  }
});

AdminJS.components.form.Config.fields.addType(
  { name: 'number', field: AdminJS.components.form.field_types.NumberField }
);


