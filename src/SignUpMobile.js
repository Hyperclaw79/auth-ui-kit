import React, { Component } from "react";
import {Helmet} from "react-helmet";
import SocialLoginWrapper from './SocialLoginWrapper';
import SignInMessage from './SignInMessage';
import { mobilePasswordSignUp, resendMobilePasswordOtp, mobilePasswordVerify } from './api';
import './style.css';
class SignUpMobile extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.isFirstStepCompleted = false;
    this.state.mobile_number = '';
    this.state.country_code = '';
  }
  handleSignup(e) {
    e.preventDefault();
    if (this.password.value === this.confirm_password.value) {
      mobilePasswordSignUp(this.mobile.value, this.password.value, this.country_code.value)
      .then( (resp) => {
        if ( resp.ok ) {
          this.setState({ ...this.state, mobile_number: this.mobile.value, country_code: this.country_code.value, isFirstStepCompleted: true});
          return
        }
        return resp.json()
        .then(( resp ) => {
          return Promise.reject(resp);
        })
        .catch(( resp ) => {
          return Promise.reject( resp );
        });
      })
      .catch( ( resp) => {
        alert("Signup failed with: " + JSON.stringify(resp) );
      });
    } else {
      alert("Passwords don't match. Try again");
    }
  }
  handleVerification(e) {
    e.preventDefault(e);
    mobilePasswordVerify(this.state.mobile_number, this.state.country_code, this.otp.value);
  }
  resendMobilePasswordOtp(e) {
    e.preventDefault();
    resendMobilePasswordOtp(this.state.mobile_number, this.state.country_code)
    .then( ( resp) => {
      alert('OTP sent to mobile with number ' + this.state.mobile_number + ' again');
    })
    .catch( ( resp ) => {
      alert('Error sending otp again');
    });
  }
  render() {
    return (
      <div className='landingPageWrapper container-fluid'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign up with Mobile</title>
        </Helmet>
        <div className='landingPageInnerWrapper'>
          <div className='signUpWrapper'>
            <div className='headerDescription'>
              Sign Up
            </div>
            <div className='descriptionText'>
              Hello! Sign up with your mobile
            </div>
            <form className='formGroupWrapper'>
              { !this.state.isFirstStepCompleted ? (
                <div>
                  <div className='formInput'>
                    <input className='countryInput' type="number" placeholder='Country code' ref={(input) => { this.country_code = input; }} />
                    <input className='mobileInput' type="text" placeholder='Enter mobile number' ref={(input) => { this.mobile = input; }} />
                  </div>
                  <div className='formInput'>
                    <input type="password" placeholder='Password' ref={(input) => { this.password = input; }} />
                  </div>
                  <div className='formInput'>
                    <input type="password" placeholder='Confirm Password' ref={(input) => { this.confirm_password = input; }} />
                  </div>
                  <div className='linkDescription forgotPassword descriptionText'>
                    <a>Forgot Password?</a>
                  </div>
                </div>
              ) : (
                <div className='formInput'>
                  <input type="text" placeholder='otp' ref={ (input) => { this.otp = input }} />
                  <div className="">
                    Haven't received OTP yet?
                    <a href="" onClick={ this.resendMobilePasswordOtp.bind(this) }>
                      Resend
                    </a>
                  </div>
                </div>
              )}
              <div className='signInbtn'>
                { !this.state.isFirstStepCompleted ? (
                  <a>
                    <button data-button-id="signup" onClick={ this.handleSignup.bind(this) }>
                      Signup
                    </button>
                  </a>
                ) : (
                  <a>
                    <button data-button-id="verify-mobile" onClick={ this.handleVerification.bind(this) }>
                      Verify Mobile
                    </button>
                  </a>
                ) }
              </div>
            </form>
            <SocialLoginWrapper />
            <SignInMessage />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpMobile;
