NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Sidebar = React.createClass({
  _renderMenu: function(menu, index) {
    var submenu, submenu_icon, liClass = [menu.palette];
    
    if(menu.menu) {
      submenu = this._renderSubmenu(menu, menu.palette);
      liClass.push("openable")
      submenu_icon = <span className="submenu-icon"></span>;
    }
    if(menu.active) {
      liClass.push("active")
    }
    
    return <li className={liClass.join(" ")} key={index}>
      <a href="#">
        <span className="menu-content block">
          <span className="menu-icon"><i className={menu.iconClass}></i></span>
          <span className="text m-left-sm">{menu.text}</span>
          {submenu_icon}
        </span>
        <span className="menu-content-hover block">
          {menu.alt}
        </span>
      </a>
      {submenu}
    </li>;
  },

  _renderSubmenu: function(menu, palette) {
    var submenu = menu.menu.map(function(submenu, index) {
      return <li key={index}><a href="form_element.html"><span className="submenu-label">{submenu.text}</span></a></li>;
    }, this), ulClass = ["submenu", palette];
    return <ul className={ulClass.join(" ")}>
      {submenu}
    </ul>
  },
  
  render: function() {
    var menus = this.props.menu.map(function(menu, index) {
      return this._renderMenu(menu, index);
    }, this);
    
    return (
        <aside className="sidebar-menu fixed">
          <div className="sidebar-inner scrollable-sidebar">
            <div className="main-menu">
              <ul className="accordion">
                <li className="menu-header">
                  Main Menu
                </li>
              
                {menus}
              </ul>
            </div>
            
            <div className="sidebar-fix-bottom clearfix">
              <div className="user-dropdown dropup pull-left">
                <a href="#" className="dropdwon-toggle font-18" data-toggle="dropdown"><i className="ion-person-add"></i>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="inbox.html">
                      Inbox
                      <span className="badge badge-danger bounceIn animation-delay2 pull-right">1</span>
                    </a>
                  </li>       
                  <li>
                    <a href="#">
                      Notification
                      <span className="badge badge-purple bounceIn animation-delay3 pull-right">2</span>
                    </a>
                  </li>       
                  <li>
                    <a href="#" className="sidebarRight-toggle">
                      Message
                      <span className="badge badge-success bounceIn animation-delay4 pull-right">7</span>
                    </a>
                  </li>           
                  <li className="divider"></li>
                  <li>
                    <a href="#">Setting</a>
                  </li>           
                </ul>
              </div>
              <a href="lockscreen.html" className="pull-right font-18"><i className="ion-log-out"></i></a>
            </div>
          </div>
        </aside>
    );
  }
});
