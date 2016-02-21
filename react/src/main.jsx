var Item = (props) => {
  return <li key={props.key}>{props.key}: {props.val}</li>;
};

var FirebaseListing = React.createClass({
  getInitialState: function() {
    var leaderboardRef = new Firebase("https://reactive-poc.firebaseio.com/");
    var self = this;
    leaderboardRef.on("child_added", function(snapshot) {
      self.setState(function(previousState) {
        return {
          list: previousState.list.concat([{key: snapshot.key(), val: snapshot.val()}])
        };
      });
    });

    return {
      list: []
    };
  },

  render: function(){
    return <div>
      <h1>Elements</h1>
      <ul>
        {this.state.list.map(Item)}
      </ul>
    </div>;
  }
});

ReactDOM.render(
  <FirebaseListing />,
  document.getElementById('example')
);


