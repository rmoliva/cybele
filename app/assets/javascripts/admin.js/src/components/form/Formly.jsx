NS('AdminJS.components.form');

AdminJS.components.form.Formly = function() {
  /** @jsx React.DOM */
  'use strict';
  
  function typeOrComponent(props, propName, componentName) {
    var errorPrefix = componentName + ' config.fields field with key ' + props.key;
    if (props.type && props.component) {
      return new Error(errorPrefix + ' should only have either a type or a component, not both.');
    } else if (!props.type && !props.component) {
      return new Error(errorPrefix + ' should have either a type (string) or a component (React component)');
    }
  }
  
  function generateFieldTag(field, model, onValueUpdate) {
    var fieldComponent = field.component ? field.component : AdminJS.components.form.Config.fields.getTypes()[field.type];
    if (!fieldComponent) {
      throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
    }
  
    if (shouldHide(field, model)) {
      return null;
    }
  
    return getComponent(fieldComponent, field, model, onValueUpdate);
  }
  
  function getComponent(FieldComponent, field, model, onValueUpdate) {
    var component = <FieldComponent model={model} config={field} onValueUpdate={onValueUpdate} />;
    if (field.props) {
      var props = typeof field.props === 'function' ? field.props(model, field) : field.props;
      component = React.addons.cloneWithProps(component, merge(props, {
        key: component.props.key
      }));
    }
    return component;
  }
  
  function shouldHide(field, model) {
    var hide = isOrInvoke(field, 'hidden', model);
    return hide && hide !== null;
  }
  
  function isOrInvoke(field, property, model) {
    if (!field.hasOwnProperty(property)) {
      return null;
    }
    if (typeof field[property] === 'function') {
      return field[property](model, field);
    } else {
      return !!field[property];
    }
  }
  
  return React.createClass({
    propTypes: {
      onFormlyUpdate: React.PropTypes.func.isRequired,
      config: React.PropTypes.shape({
        name: React.PropTypes.string,
        fields: React.PropTypes.arrayOf(React.PropTypes.shape({
          key: React.PropTypes.string.isRequired,
          type: typeOrComponent,
          component: typeOrComponent,
          hidden: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.func
          ]),
          props: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func
          ]),
          data: React.PropTypes.object
        }))
      }),
      model: React.PropTypes.object
    },
  
    getDefaultProps: function() {
      return { model: {} };
    },
  
    onValueUpdate: function(fieldKey, value) {
      this.state[fieldKey] = value;
      this.props.onFormlyUpdate(this.state);
    },
    
    getInitialState: function() {
      return this.props.model;
    },
    
    render: function() {
      var model = this.state;
      var onValueUpdate = this.onValueUpdate;
      var fields = this.props.config.fields.map(function(field) {
        return generateFieldTag(field, model, onValueUpdate);
      });
      return <form className="formly" role="form" ref="form" name={this.props.config.name}>{fields}</form>;
    }
  });
}();

