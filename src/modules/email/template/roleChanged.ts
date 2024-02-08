 
export function roleChanged(role: string[], company_name: string, name: string) {
  return `
  <div class="body"
  style=" margin-top: 1.7em; margin-bottom: 2em;">

    <h1
    style="font-size:22px; color: #404040; font-weight: 700; line-height:28px; letter-spacing:-0.5%;">
    Role Changed</h1>
    <p style="color: #404040; font-weight: 400;">Dear ${name},
    </p>
    <p style="color: #404040; font-weight: 400;">
    Your role in 
    ${company_name}
    has been change to  ${role.forEach(element => {
      return element
    })}
    </p>
  <p style="color: #404040; font-weight: 400;">Feel free to
      reach out with any
      questions!</p>
  <p style="font-weight: 600; color: #404040;">Enirman</p>
  
  </div>`;
}
