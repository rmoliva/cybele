NS('AdminJS.components.adminjs');

AdminJS.modules.topnav.View = React.createClass({
  
  onClickLogOut: function() {
    this.props.controller.call("handleOnLogout");
  },
  
  render: function() {
    return (
      <div className="top-nav">
        <div className="top-nav-inner"> 
            <div className="nav-header">
                <button type="button" className="navbar-toggle pull-left sidebar-toggle" id="sidebarToggleSM">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <ul className="nav-notification pull-right">
                </ul>
 
                <a href="" className="brand">
                    <i className="fa fa-database"></i><span className="brand-name">{t("app_name")}</span>
                </a>
            </div>
            <div className="nav-container">
                <button type="button" className="navbar-toggle pull-left sidebar-toggle" id="sidebarToggleLG">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
 
                {/* Search Input */}
                <ul className="nav-notification"> 
                    <li className="search-list">
                        <div className="search-input-wrapper">
                            <div className="search-input">
                                <input type="text" className="form-control input-sm inline-block" />
                                <a href="#" className="input-icon text-normal"><i className="ion-ios7-search-strong"></i></a>
                            </div>
                        </div>
                    </li>
                </ul>
                {/* End Search Input */}
 
                {/* Notificaton */}
                <div className="pull-right m-right-sm">
                    <div className="user-block hidden-xs">
                        <a href="#" id="userToggle" data-toggle="dropdown">
                            <img src="images/profile/profile1.jpg" alt="" className="img-circle inline-block user-profile-pic" />
                            <div className="user-detail inline-block">
                                {this.props.model.cursor().get('user_name')}
                                <i className="fa fa-angle-down"></i>
                            </div>
                        </a>
                        <div className="panel border dropdown-menu user-panel">
                            <div className="panel-body paddingTB-sm">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-edit fa-lg"></i><span className="m-left-xs">{t("my_profile")}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={this.onClickLogOut}>
                                            <i className="fa fa-power-off fa-lg"></i><span className="m-left-xs">{t("sign_out")}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav-notification">
                    </ul>
                </div>
                {/* End Notificaton */}
 
            </div>
        </div>
    
      </div>
    );
  }
});
