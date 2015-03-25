NS('AdminJS.components.adminjs');

AdminJS.components.adminjs.Navbar = React.createClass({
  render: function() {
    return (
      <ReactBootstrap.Navbar fixedTop={true} inverse={true} fluid={true} brand="Mejora de la Calidad" defaultNavExpanded={true}>
        <ReactBootstrap.Nav>
          <ReactBootstrap.DropdownButton eventKey={3} title="Aplicativos">
            <ReactBootstrap.MenuItem eventKey="1">Administración Central</ReactBootstrap.MenuItem>
            <ReactBootstrap.MenuItem eventKey="2">Administración de Red</ReactBootstrap.MenuItem>
            <ReactBootstrap.MenuItem eventKey="3">Administración de Organización</ReactBootstrap.MenuItem>
          </ReactBootstrap.DropdownButton>
        </ReactBootstrap.Nav>
        <ReactBootstrap.Nav right eventKey={0}>
          <ReactBootstrap.DropdownButton eventKey={3} title="Mi Cuenta">
            <ReactBootstrap.MenuItem eventKey="1">Mi Cuenta</ReactBootstrap.MenuItem>
            <ReactBootstrap.MenuItem eventKey="2">Configuración</ReactBootstrap.MenuItem>
            <ReactBootstrap.MenuItem divider />
            <ReactBootstrap.MenuItem eventKey="3">Español</ReactBootstrap.MenuItem>
            <ReactBootstrap.MenuItem eventKey="4">Inglés</ReactBootstrap.MenuItem>
          </ReactBootstrap.DropdownButton>
        </ReactBootstrap.Nav>
      </ReactBootstrap.Navbar>
    );
  }
});
