NS('AdminJS.lib');

AdminJS.lib.ModelMixin = {
  getInitialState: function() {
    return this.props.model.getData();
  },
    
  componentDidMount: function() {
    this.props.model.on.commited.add(this.onModelCommited);
  },
    
  onModelCommited: function(data) {
    this.setState(data);
  },
};
