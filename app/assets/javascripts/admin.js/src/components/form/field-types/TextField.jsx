NS('AdminJS.components.form.field_types');

AdminJS.components.form.field_types.TextField = React.createClass({
  mixins: [AdminJS.components.form.FieldMixin],
  
  validations: function() {
    var validate = this.props.config.validate, props = {};
    
    _.each(validate, function(value, key) {
      props["data-parsley-"+key]=value;
    });
    return props;
  },
  
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;

    var validations = this.validations();
    if(config.data.label) {
      return (
        <div>
          <label>
            {config.data.label}
            <input className="form-control" type="text" name={key} value={model[key]} placeholder={config.placeholder} onChange={this.onChange} {...validations} />
          </label>
        </div>
      );
    } else {
      return (
        <div className="form-group m-bottom-md">
          <input className="form-control" type="text"  name={key} placeholder={config.placeholder} value={model[key]} onChange={this.onChange} {...validations} />
        </div>
      );
    }
  }
});

AdminJS.components.form.Config.fields.addType(
  { name: 'text', field: AdminJS.components.form.field_types.TextField }
);

