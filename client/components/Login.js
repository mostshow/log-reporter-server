
import React from 'react'

import styles from '../css/login.css'
import { connect } from 'react-redux'
import { loginRequest } from '../actions/logActions'
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button, Modal } from 'react-bootstrap';
class Login extends React.Component {

  constructor(){
    super()
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePass = this.handleChangePass.bind(this)
    this.login = this.login.bind(this)
  }

  getInitialState() {
    return {
      username: '',
      password: ''
    };
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePass(e) {
    this.setState({ password: e.target.value });
  }

  login(){
    this.props.loginRequest(this.state)
  }

  render() {

    let data = this.props.loginData;
    return (
      <Form horizontal className={styles.formContent}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            用户名
          </Col>
          <Col sm={4}>
            <FormControl type="text" placeholder="Username" onChange={this.handleChangeUsername}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
            密码
          </Col>
          <Col sm={4}>
            <FormControl type="password" placeholder="Password" onChange={this.handleChangePass} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={7} sm={4}>
            <Button type="submit" onClick={this.login} >
              登录
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

}
function mapStateToProps(state) {
    return {
        loginData: state.login
    }
}

Login.propTypes = {
    loginRequest: React.PropTypes.func.isRequired
}

export default connect( mapStateToProps, { loginRequest } )(Login)
