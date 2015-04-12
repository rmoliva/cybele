NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.Radio = React.createClass({
  mixins: [AdminJS.components.form.FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
//    var options = config.options.map(function(option) {
//      return (
//        <div className="radio">
//          <label>
//            <input type="radio" name={key} id={key + option.value} value={option.value}>
//            {option.label}
//          </label>
//        </div>
//      );
//    });
//    return (
//      <div>
//        {config.data.label}
//        {options}
//      </div>
//    );
  }
});

AdminJS.components.form.Config.fields.addType(
  { name: 'radio', field: AdminJS.components.form.field_types.Radio }
);

