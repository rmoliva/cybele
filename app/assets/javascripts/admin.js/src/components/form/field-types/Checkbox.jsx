NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.Checkbox = React.createClass({
  mixins: [AdminJS.components.form.FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" name={key} checked={model[key]} onChange={this.onChange} />
          {config.data.label}
        </label>
      </div>
      );
  }
});

AdminJS.components.form.Config.fields.addType(
  { name: 'checkbox', field: AdminJS.components.form.field_types.Checkbox }
);
