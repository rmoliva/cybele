NS('AdminJS.components.adminjs.login.form');

AdminJS.components.adminjs.login.form.Login = React.createClass({
  getInitialState: function() {
    return { model: {} };
  },
  onFormlyUpdate: function(model) {
    this.setState({model: model});
  },
  componentWillMount: function() {
    this.formlyConfig = {
      name: 'myFormly',
      fields: [{
        key: 'initialInstructions',
        type: 'simplerender',
        contents: (
          <div>
            Discover React Formly by going through this form...
            <br />
            <small>Guess what... This text is a non-value "field"</small>
          </div>
        )
      }, {
        key: 'buildingWithReact',
        type: 'checkbox',
        data: {
          label: 'Are you building something with React?'
        }
      }, {
        key: 'text',
        type: 'text',
        data: {
          label: 'Nombre:'
        }
      }]
    };
  },
  render: function() {
    return (
      <div className="container">
        <h2>Form</h2>
        <AdminJS.components.form.Formly config={this.formlyConfig} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />

        <h2>Model:</h2>
        <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
      </div>
    );
  }
});