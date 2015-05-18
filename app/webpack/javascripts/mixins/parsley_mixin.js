
module.exports = {
  parsley: null, 

  validate: function() {
    if(this.parsley) {
      return this.parsley.validate();
    }
    return false;
  },
    
  componentDidMount: function() {
    var selector = this.refs.parsley_form.getDOMNode();
    this.parsley = $(selector).parsley();
  }
};
