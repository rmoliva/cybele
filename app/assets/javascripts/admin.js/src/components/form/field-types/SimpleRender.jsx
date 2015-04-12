NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.SimpleRender = React.createClass({
  render: function() {
    return (<div>{this.props.config.contents}</div>);
  }
});

AdminJS.components.form.Config.fields.addType(
  { name: 'simplerender', field: AdminJS.components.form.field_types.SimpleRender}
);

