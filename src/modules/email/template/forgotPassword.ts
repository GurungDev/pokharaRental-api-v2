
export function passwordChange(otp: string) {
  return `
  <div class="body"
  style="margin-top: 1.7em; margin-bottom: 2em;">
  <h1
      style="font-size:22px; color: #404040; font-weight: 700; line-height:28px; letter-spacing:-0.5%;">
      Reset Password</h1>
  <p style="color: #404040; font-weight: 400;">Dear User,
  </p>
  <p style="color: #404040; font-weight: 400;">We received a
      request to reset your password. If you did not make this
      request, please disregard this email.</p>
  <p style="color: #404040; font-weight: 400;">Your OTP is dispayed below:</p>
  <p style="color: #404040; font-weight: 400;">${otp}</p>

  <p style="color: #404040; font-weight: 400;"> If you
      continue having issues resetting your password, please
      contact our support team at support@pokharaRental.com.</p>
  <p style="font-weight: 600; color: #404040;">Pokhara Rental</p>
  
  </div>`;
}
