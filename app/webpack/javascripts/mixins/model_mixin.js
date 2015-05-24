
module.exports = {
  getInitialState: function() {
    return this.props.model.getState();
  },
    
  componentDidMount: function() {
    this.props.model.on.commited.add(this.onModelCommited);
  },
    
  onModelCommited: function() {
    this.setState(this.props.model.getState());
  },
};
