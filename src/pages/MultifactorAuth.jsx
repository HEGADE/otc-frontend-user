import React from 'react'
import { EmailVerification } from '../components/Auth/EmailVerification';
import { OtpVerification } from '../components/Auth/OtpVerification';
import { useUserStore } from '../store/user.store';
import { Navigate } from 'react-router-dom';

function MultifactorAuth() {
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);

  return (
    <div>
      {accessToken && user && !user.isEmailVerified && <EmailVerification/>}
      {accessToken && user && user.isEmailVerified && !user.isPhoneNumberVerified && <OtpVerification/>}
    </div>
  )
}

export default MultifactorAuth
