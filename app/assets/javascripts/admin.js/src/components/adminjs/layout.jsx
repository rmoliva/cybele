NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Layout = React.createClass({
  
  render: function() {
    return (
      <div className="wrapper">
       
          {/* Right Sidebar */}
          <div className="sidebar-right">
       
          </div>
          {/* End of Right Sidebar */}
       
          {/* Top Navigation - Render module: topnav*/}
          <div id='topnav'>
          </div>
       
          {/* End of Top Navigation */}
       
          {/* Left Sidebar Menu */}
          <div id='sidebar'>
          </div>

          {/* End of Sidebar Menu */}
        
          {/* Main Container */}
          <div className="main-container">
            <div className="padding-md">
              <div className="row">
                <div className="col-sm-6">
                  <div className="page-title">
                    Dashboard
                  </div>
                  <div className="page-sub-header">
                    Welcome Back, John Doe , <i className="fa fa-map-marker text-danger"></i> London
                  </div>
                </div>
                <div className="col-sm-6 text-right text-left-sm p-top-sm">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                      Select Project <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu pull-right" role="menu">
                      <li><a href="#">Project1</a></li>
                      <li><a href="#">Project2</a></li>
                      <li><a href="#">Project3</a></li>
                      <li className="divider"></li>
                      <li><a href="#">Setting</a></li>
                    </ul>
                  </div>
    
                  <a className="btn btn-default"><i className="fa fa-cog"></i></a>
                </div>
                
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                
              </div>
            </div>
          </div>
          {/* End of Main Container */}
        
          {/* Footer */}
          <footer className="footer">
            <span className="footer-brand">
              <strong className="text-danger">Simplify</strong> Admin
            </span>
            <p className="no-margin">
              &copy; 2014 <strong>Simplify Admin</strong>. ALL Rights Reserved. 
            </p>
          </footer>
          {/* End of Footer */}
          
          <a href="#" className="scroll-to-top hidden-print">
            <i className="fa fa-chevron-up fa-lg"></i>
          </a>
      </div>
    );
  }
});
