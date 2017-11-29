import React, { Component } from "react";
import {Helmet} from "react-helmet";
import SocialLoginWrapper from './SocialLoginWrapper';
import './style.css';
class MobileOtp extends Component {
  render() {
    return (
      <div className='landingPageWrapper container-fluid'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign in with Mobile OTP</title>
        </Helmet>
        <div className='landingPageInnerWrapper'>
          <div className='signUpWrapper'>
            <div className='headerDescription addPaddTop'>
              Sign In
            </div>
            <div className='descriptionText'>
              Hello! Sign in with your mobile OTP
            </div>
            <form className='formGroupWrapper'>
              <input type="text" placeholder='Sign in with mobile otp' />
            </form>
            <form className='formGroupWrapper hide'>
              <input type="text" placeholder='otp' />
            </form>
            <div className='signInbtn'>
              <a><button>Sign In</button></a>
            </div>
            <SocialLoginWrapper />
            <div className='descriptionText'>
              Don{'\''}t have an account? <b>Sign Up</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileOtp
