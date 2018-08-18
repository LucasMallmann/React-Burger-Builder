import React, { Component } from "react";

import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErroHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqAxiosInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resAxiosInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
          console.log(err);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqAxiosInterceptor);
      axios.interceptors.response.eject(this.resAxiosInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErroHandler;
