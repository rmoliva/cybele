NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.TextField = React.createClass({
  mixins: [AdminJS.components.form.FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    return (
      <div>
        <label>
          {config.data.label}
          <input className="form-control" type="text" name={key} value={model[key]} placeholder={config.placeholder} onChange={this.onChange} required />
        </label>
      </div>
    );
  }
});

AdminJS.components.form.Config.fields.addType(
  { name: 'text', field: AdminJS.components.form.field_types.TextField }
);

