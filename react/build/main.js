var Item = props => {
  return React.createElement(
    "li",
    { key: props.key },
    props.key,
    ": ",
    props.val
  );
};

var FirebaseListing = React.createClass({
  displayName: "FirebaseListing",

  getInitialState: function () {
    var leaderboardRef = new Firebase("https://reactive-poc.firebaseio.com/");
    var self = this;
    leaderboardRef.on("child_added", function (snapshot) {
      self.setState(function (previousState) {
        return {
          list: previousState.list.concat([{ key: snapshot.key(), val: snapshot.val() }])
        };
      });
    });

    return {
      list: []
    };
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Elements"
      ),
      React.createElement(
        "ul",
        null,
        this.state.list.map(Item)
      )
    );
  }
});

ReactDOM.render(React.createElement(FirebaseListing, null), document.getElementById('example'));