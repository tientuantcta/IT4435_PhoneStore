import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import loginImage from "../../assets/registerImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.jsx";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.jsx";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.jsx";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.jsx";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.jsx";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.jsx";
import axios from "axios";

const Register = (props) => {
  const [state, setState] = useState({ username: "", password: "" });
  const history = useHistory();
  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const redirectAfterRegister = () => {
    history.push("/admin/dashboard");
  };

  const doRegister = async (e) => {
    e.preventDefault();
    console.log(state);

    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username: state.username,
        password: state.password,
      });

      // Handle success response here, e.g., store the token, update the authentication state, etc.
      console.log(response.data.code);
      if (response.data.code === "1000") {
        redirectAfterRegister();
      }
    } catch (error) {
      alert("Signup Failed");
      // Handle error here, e.g., display an error message
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Đăng ký</p>
                <div className="logo-block">
                  <SofiaLogo />
                  <p className="mb-0">YOUR PHONE STORE</p>
                </div>
              </div>
              <div className="auth-info my-2">
                <p>Quản lý cửa hàng điện thoại của bạn</p>
              </div>
              <form onSubmit={(event) => doRegister(event)}>
                <FormGroup className="my-3">
                  <FormText>Username</FormText>
                  <Input
                    id="username"
                    className="input-transparent pl-3"
                    value={state.username}
                    onChange={(event) => changeCred(event)}
                    required
                    name="username"
                    placeholder="user"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Mật khẩu</FormText>
                    <Link to="/error">Quên mật khẩu ?</Link>
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event) => changeCred(event)}
                    type="password"
                    required
                    name="password"
                    placeholder="Đặt mật khẩu của bạn"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button
                    className="rounded-pill my-3"
                    type="submit"
                    color="secondary-red"
                  >
                    Đăng ký{" "}
                  </Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                <div className="d-flex align-items-center my-3">
                  <p className="social-label mb-0">Đăng nhập với</p>
                  <div className="socials">
                    <a href="https://flatlogic.com/">
                      <GoogleIcon />
                    </a>
                    <a href="https://flatlogic.com/">
                      <TwitterIcon />
                    </a>
                    <a href="https://flatlogic.com/">
                      <FacebookIcon />
                    </a>
                    <a href="https://flatlogic.com/">
                      <GithubIcon />
                    </a>
                    <a href="https://flatlogic.com/">
                      <LinkedinIcon />
                    </a>
                  </div>
                </div>
                <Link to="/login">Đăng nhập tài khoản có sẵn</Link>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImage} alt="Error page" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
