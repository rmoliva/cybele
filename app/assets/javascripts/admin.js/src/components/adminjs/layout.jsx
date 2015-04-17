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
          <div id='main-container' className="main-container">
          </div>
          {/* End of Main Container */}
        
          {/* Footer */}
          <div className="navbar navbar-fixed-bottom">
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
      </div>
    );
  }
});
