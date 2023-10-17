import React, { Component } from "react";

import Loading from "@/components/UI/Loading";

class Redirect extends Component {
  componentDidMount() {
    window.location.href = decodeURIComponent(this.props.match.params.url);
  }
  render() {
    return <Loading show={true} opacity={1}></Loading>;
  }
}

export default Redirect;
