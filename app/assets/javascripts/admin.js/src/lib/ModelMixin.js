NS('AdminJS.lib');

AdminJS.lib.ModelMixin = {
  getInitialState: function() {
    return this.props.model.getValues();
  },
    
  componentDidMount: function() {
    this.props.model.on.setted.add(this.onModelSetted);
  },
    
  onModelSetted: function(data) {
    var state = {};
    state[data.key] = data.value;
    this.setState(state);
  },
};
