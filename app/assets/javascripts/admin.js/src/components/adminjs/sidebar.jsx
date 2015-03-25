NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Sidebar = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    active: React.PropTypes.string,
  },
  
  activeKey: function() {
    var ret = -1;
    this.props.items.forEach(function(link,index) {
      if(this.props.active === link.href) {
        ret = index;
      }
    }, this);
    return ret;
  },
  
  links: function() {
    return this.props.items.map(function(link, index) {
      return <ReactBootstrap.NavItem key={index} eventKey={index} href={link.href}>{link.title}</ReactBootstrap.NavItem>
    }, this);
  },

  render: function() {
    return (
      <ReactBootstrap.Nav bsStyle="pills" stacked activeKey={this.activeKey()}>
        {this.links()}
      </ReactBootstrap.Nav>
    );
  }
});
