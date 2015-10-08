NS('AdminJS.modules.users.views');

AdminJS.modules.users.views.PrevNext = React.createClass({
  render: function() {
    return <div>
      <span className="fc-button fc-button-prev fc-state-default fc-corner-left" unselectable="on" disabled>
        <span className="fc-icon fc-icon-left-single-arrow" />
      </span>
      <span className="fc-button fc-button-next fc-state-default fc-corner-right" unselectable="on" disabled>
        <span className="fc-icon fc-icon-right-single-arrow" />
      </span>      
    </div>;
  }

});

