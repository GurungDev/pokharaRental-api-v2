
export function ContactInfo(name: string, email:string,  phone: string, description: string) {
  return `
  <div class="body"
  style=" margin-top: 1.7em; margin-bottom: 2em;">
 
      <p style="color: #404040; font-size:22px; font-weight: 400;">User ${name}, would like to contact you.</p>
      <p style="color: #404040;  font-weight: 400;"> Name : ${name}</p>
      <p style="color: #404040;  font-weight: 400;"> Phone Number: ${phone}</p>
      <p style="color: #404040;  font-weight: 400;"> Email : ${email}</p>
      <p style="color: #404040;  font-weight: 400;"> Inquiry : ${description}</p>

      <p style="color: #404040; font-weight: 400;">Feel free to
      reach out with any
      questions!</p>
  <p style="font-weight: 600; color: #404040;">Pokhara rental Team</p>
  </div>`;
}
