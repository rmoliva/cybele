NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Sidebar = React.createClass({
  render: function() {
    return (
        <aside className="sidebar-menu fixed">
          <div className="sidebar-inner scrollable-sidebar">
            <div className="main-menu">
              <ul className="accordion">
                <li className="menu-header">
                  Main Menu
                </li>
                <li className="bg-palette1 active">
                  <a href="index.html">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-home fa-lg"></i></span>
                      <span className="text m-left-sm">Dashboard</span>
                    </span>
                    <span className="menu-content-hover block">
                      Home
                    </span>
                  </a>
                </li>
                <li className="bg-palette2">
                  <a href="landing/landing.html">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-desktop fa-lg"></i></span>
                      <span className="text m-left-sm">Landing</span>
                    </span>
                    <span className="menu-content-hover block">
                      Landing
                    </span>
                  </a>
                </li>
                <li className="openable bg-palette3">
                  <a href="#">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-list fa-lg"></i></span>
                      <span className="text m-left-sm">Form Elements</span>
                      <span className="submenu-icon"></span>
                    </span>
                    <span className="menu-content-hover block">
                      Form
                    </span>
                  </a>
                  <ul className="submenu bg-palette4">
                    <li><a href="form_element.html"><span className="submenu-label">Form Element</span></a></li>
                    <li><a href="form_validation.html"><span className="submenu-label">Form Validation</span></a></li>
                    <li><a href="form_wizard.html"><span className="submenu-label">Form Wizard</span></a></li>
                    <li><a href="dropzone.html"><span className="submenu-label">Dropzone</span></a></li>
                  </ul>
                </li>
                
                
                <li className="openable bg-palette4">
                  <a href="#">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-tags fa-lg"></i></span>
                      <span className="text m-left-sm">UI Elements</span>
                      <span className="submenu-icon"></span>
                    </span>
                    <span className="menu-content-hover block">
                      UI Kits
                    </span>
                  </a>
                  <ul className="submenu">
                    <li><a href="ui_element.html"><span className="submenu-label">Basic Elements</span></a></li>
                    <li><a href="button.html"><span className="submenu-label">Button  Icons</span></a></li>
                    <li className="openable">
                      <a href="#">
                        <small className="badge badge-success badge-square bounceIn animation-delay2 m-left-xs pull-right">2</small>
                        <span className="submenu-label">Tables</span>
                      </a>
                      <ul className="submenu third-level">
                        <li><a href="static_table.html"><span className="submenu-label">Static Table</span></a></li>
                        <li><a href="datatable.html"><span className="submenu-label">DataTables</span></a></li>
                      </ul>
                    </li>
                    <li><a href="widget.html"><span className="submenu-label">Widget</span></a></li>
                    <li><a href="tab.html"><span className="submenu-label">Tab</span></a></li>
                    <li><a href="calendar.html"><span className="submenu-label">Calendar</span></a></li>
                    <li><a href="treeview.html"><span className="submenu-label">Treeview</span></a></li>
                    <li><a href="nestable_list.html"><span className="submenu-label">Nestable Lists</span></a></li>
                  </ul>
                </li>
                
                
                
                <li className="bg-palette1">
                  <a href="inbox.html">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-envelope fa-lg"></i></span>
                      <span className="text m-left-sm">Inboxs</span>
                      <small className="badge badge-danger badge-square bounceIn animation-delay5 m-left-xs">5</small>
                    </span>
                    <span className="menu-content-hover block">
                      Inboxs
                    </span>
                  </a>
                </li>
                <li className="bg-palette2">
                  <a href="timeline.html">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-clock-o fa-lg"></i></span>
                      <span className="text m-left-sm">Timeline</span>
                      <small className="badge badge-warning badge-square bounceIn animation-delay6 m-left-xs pull-right">7</small>
                    </span>
                    <span className="menu-content-hover block">
                      Timeline
                    </span>
                  </a>
                </li>
                <li className="menu-header">
                  Others
                </li>
                <li className="openable bg-palette3">
                  <a href="#">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-gift fa-lg"></i></span>
                      <span className="text m-left-sm">Extra Pages</span>
                      <span className="submenu-icon"></span>
                    </span>
                    <span className="menu-content-hover block">
                      Pages
                    </span>
                  </a>
                  <ul className="submenu">
                    <li><a href="signin.html"><span className="submenu-label">Sign in</span></a></li>
                    <li><a href="signup.html"><span className="submenu-label">Sign Up</span></a></li>
                    <li><a href="lockscreen.html"><span className="submenu-label">Lock Screen</span></a></li>
                    <li><a href="profile.html"><span className="submenu-label">Profile</span></a></li>
                    <li><a href="gallery.html"><span className="submenu-label">Gallery</span></a></li>
                    <li><a href="blog.html"><span className="submenu-label">Blog</span></a></li>
                    <li><a href="single_post.html"><span className="submenu-label">Single Post</span></a></li>
                    <li><a href="pricing.html"><span className="submenu-label">Pricing</span></a></li>
                    <li><a href="invoice.html"><span className="submenu-label">Invoice</span></a></li>
                    <li><a href="error404.html"><span className="submenu-label">Error404</span></a></li>
                    <li><a href="blank.html"><span className="submenu-label">Blank</span></a></li>
                  </ul>
                </li>
                <li className="openable bg-palette4">
                  <a href="#">
                    <span className="menu-content block">
                      <span className="menu-icon"><i className="block fa fa-list fa-lg"></i></span>
                      <span className="text m-left-sm">Menu Level</span>
                      <span className="submenu-icon"></span>
                    </span>
                    <span className="menu-content-hover block">
                      Menu
                    </span>
                  </a>
                  <ul className="submenu">
                    <li className="openable">
                      <a href="signin.html">
                        <span className="submenu-label">menu 2.1</span>
                        <small className="badge badge-success badge-square bounceIn animation-delay2 m-left-xs pull-right">3</small>
                      </a>
                      <ul className="submenu third-level">
                        <li><a href="#"><span className="submenu-label">menu 3.1</span></a></li>
                        <li><a href="#"><span className="submenu-label">menu 3.2</span></a></li>
                        <li className="openable">
                          <a href="#">
                            <span className="submenu-label">menu 3.3</span>
                            <small className="badge badge-danger badge-square bounceIn animation-delay2 m-left-xs pull-right">2</small>
                          </a>
                          <ul className="submenu fourth-level">
                            <li><a href="#"><span className="submenu-label">menu 4.1</span></a></li>
                            <li><a href="#"><span className="submenu-label">menu 4.2</span></a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li><a href="#"><span className="submenu-label">menu 2.2</span></a></li>
                  </ul>
                </li>
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
