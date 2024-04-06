import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.scss";
import {ApplicationState} from "../../../store";

class AddUser extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>123</div>;
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AddUser);
