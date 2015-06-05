NS('AdminJS.components.adminjs');

AdminJS.modules.sidebar.View = React.createClass({
  
  _handleClickMenu: function(link) {
    this.props.controller.call('handleClick',{link: link});
  },
  
  /**
   * La siguiente funcion comprueba si un menu tiene una clave
   * determinada o la tienen sus hijos 
   */
  _hasKey: function(menu, key) {

    // Comprobar si la tiene el propio menu
    if(menu.get('key') === key) {
      return true; 
    }
    
    // Comprobar si la tiene alguno de sus hijos
    return _.any(menu.get('menu').toArray(), function(submenu) {
      return submenu.get('key') === key;
    })
    return false;
  },
  
  _getSidebarActive: function() {
    return this.props.model.cursor().get("sidebar_active");
  },
  
  _renderMenu: function(menu) {
    var submenu, 
      submenu_icon,
      active = this._hasKey(menu, this._getSidebarActive()),
      with_submenu = !_.isEmpty(menu.get('menu')),
      clsNames = {
        active: active, 
        open: active,
        openable: with_submenu
      },
      liClass;
    clsNames[menu.get('palette')] = true
    liClass = classNames(clsNames);
    
    if(with_submenu) {
      submenu = this._renderSubmenu(menu, menu.get('palette'));
      submenu_icon = <span className="submenu-icon"></span>;
    }

    return <li className={liClass} key={menu.get("key")}>
      <a onClick={this._handleClickMenu.bind(this, menu.get("link"))}>
        <span className="menu-content block">
          <span className="menu-icon"><i className={menu.get("iconClass")}></i></span>
          <span className="text m-left-sm">{menu.get("text")}</span>
          {submenu_icon}
        </span>
        <span className="menu-content-hover block">
          {menu.get("alt")}
        </span>
      </a>
      {submenu}
    </li>;
  },

  _renderSubmenu: function(menu, palette) {
    var submenu = menu.get('menu').toArray().map(function(submenu, index) {
      return <li key={submenu.get('key')}><a onClick={this._handleClickMenu.bind(this, submenu.get('link'))}><span className="submenu-label">{submenu.get('text')}</span></a></li>;
    }, this), ulClass = ["submenu", palette];
    return <ul className={ulClass.join(" ")}>
      {submenu}
    </ul>
  },
  
  render: function() {
    var menu_tree = this.props.model.cursor().get("menu_tree").toArray(),
      menus;
    
    if(menu_tree) {
      menus = menu_tree.map(function(menu, index) {
        return this._renderMenu(menu);
      }, this);
    }
    
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
