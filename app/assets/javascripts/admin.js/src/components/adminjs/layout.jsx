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
          <div className="sidebar-menu">
        
          </div>
          {/* End of Sidebar Menu */}
        
          {/* Main Container */}
          <div className="main-container">
        
          </div>
          {/* End of Main Container */}
        
          {/* Footer */}
          <footer className="footer">
        
          </footer>
          {/* End of Footer */}
      </div>
    );
  }
});
