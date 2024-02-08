import { EnvConfig } from "../../../config/envConfig";

export function passwordChange(token: string, name: string) {
  return `
  <div class="body"
  style="margin-top: 1.7em; margin-bottom: 2em;">
  <h1
      style="font-size:22px; color: #404040; font-weight: 700; line-height:28px; letter-spacing:-0.5%;">
      Reset Password</h1>
  <p style="color: #404040; font-weight: 400;">Dear ${name || "user"},
  </p>
  <p style="color: #404040; font-weight: 400;">We received a
      request to reset your password. If you did not make this
      request, please disregard this email.</p>
  <p style="color: #404040; font-weight: 400;">To reset your
      password, please click on the link below:</p>
 
  <p style="color: #404040; font-weight: 400;">This link will
      expire in 24 hours. Once you have reset your password,
      you can login using your new password.</p>
  <p style="color: #404040; font-weight: 400;"> If you
      continue having issues resetting your password, please
      contact our support team at support@racegroup.com.</p>
  <p style="font-weight: 600; color: #404040;">Enirman</p>
  
  </div>`;
}
