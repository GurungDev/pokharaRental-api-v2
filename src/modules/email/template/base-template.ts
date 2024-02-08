export function baseTemplate(body: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link
              href="https://fonts.googleapis.com/css2?family=Figtree&display=swap"
              rel="stylesheet">
          <title>Enirman</title>
      </head>
      <body style="margin: 0; padding: 0;">
      <div
          style=" max-width: 600px; background-color:#F4F4F4; margin: auto; padding:24px; font-family: FigTree, Arial;">
          <div style="  ">
              <div style="   font-size: 45px; font-weight: 800;">Pokhara Rental</div>
            ${body}

            <div class="footer">
            <div
                style="font-weight: 400; color:#525252;  font-size:12px; line-height:20px; letter-spacing:1.5%">Have
                any queries, feel free to email us at
                <a href="mailto:support@pokharaRental.com"
                    style="color: #1427FF; text-decoration:none;">support@pokharaRental.com</a>.</div>
            <div
                style="font-weight: 400; color: #525252; font-size:12px; line-height:20px; letter-spacing:1.5% ; display: flex; gap: 1em;">
                <p>© 2023, Pokhara Rental </p>
                <p style="font-weight: 600; ">Privacy
                    Policy</p>
                <p style="font-weight: 600; ">Terms of Service</p>
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
