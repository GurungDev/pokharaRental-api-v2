 
export function customerRegister(token: string) {
  return `
  <div class="body"
  style=" margin-top: 1.7em; margin-bottom: 2em;">
 
      <p style="color: #404040; font-size:22px; font-weight: 400;">Your OTP is displayed below</p>
  <p style="color: #404040;  font-weight: 400;">${token}</p>
 
  <p style="color: #404040; font-weight: 400;">Feel free to
      reach out with any
      questions!</p>
  <p style="font-weight: 600; color: #404040;">Pokhara rental Team</p>
  </div>`;
}
