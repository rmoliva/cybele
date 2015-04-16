NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Users = React.createClass({
  mixins: [AdminJS.lib.ModelMixin],
  
  render: function() {
    return (
      <div className="padding-md">
        <div className="clearfix">
          <div className="pull-left">
            <span className="img-demo bg-palette2">
              <i className="block fa fa-users fa-lg"></i>
            </span>
            <div className="pull-left m-left-sm">
              <h3 className="m-bottom-xs m-top-xs">Users</h3>
            </div>
          </div>
        </div>
        
        <hr />
          
        <div className="row">
          <div className="col-sm-12">
            <div className="filterToolbar">
          
          
          
          
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="buttonToolbar">
          
          
          
          
            </div>
          </div>
        </div>

        <div className="smart-widget">
          <div className="smart-widget-inner">
            <div className="smart-widget-body">
              <CommonJS.components.Table 
                columns={[{
                  key: 'name',
                  text: 'Nombre'
                }, {
                  key: 'surname',
                  text: 'Apellidos'
                }, {
                  key: 'email',
                  text: 'Email'
                }]}
                
                records = {[{
                  id: 23,
                  name: "Pepe",
                  surname: "Lopez",
                  email: "plopez@gmail.com"
                }, {
                  id: 35,
                  name: "Juan",
                  surname: "Sanchez",
                  email: "plopez@gmail.com"
                }, {
                  id: 74,
                  name: "Ramón",
                  surname: "Ramirez",
                  email: "plopez@gmail.com"
                }]}
                
                condensed={false}
                hover={true}
                keyAttribute="name"
              />
            </div>
          </div>
        </div>
          
          
        <div className="row">
          <div className="col-sm-12">
            <div className="navigatorToolbar">
          
          
          
          
            </div>
          </div>
        </div>

      </div>
    );
  }
});
