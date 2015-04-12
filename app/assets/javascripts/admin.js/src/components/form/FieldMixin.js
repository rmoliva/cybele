NS('AdminJS.components.form');

AdminJS.components.form.FieldMixin = {
  onChange: function(event) {
    var value = this.getValue(event.target);
    this.updateValue(value);
  },
  updateValue: function(value) {
    if (this.transformUpdate) {
      value = this.transformUpdate(value);
    }
    this.props.onValueUpdate(this.props.config.key, value);
  },
  getValue: function(node) {
    switch(node.type) {
      case 'checkbox':
      case 'radio':
        return node.checked;
      case 'select':
        return node.selected;
      default:
        return node.value;
    }
  }
};
