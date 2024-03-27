export function OrderSuccesMessage(quantity: number,
  priceOfSingleProduct: number,
  bookingDate: Date,
  durationInHour: number,
  totalPriceInRs: number,
  transaction_uuid: string) {
  
   const formattedBookingDate = bookingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
  <div class="body"
  style=" margin-top: 1.7em; margin-bottom: 2em;">
  <p style="color: #404040; text:1.1rem; font-weight: 400;">Your order has been successfully taken. Order details are displayed below.</p>
  <p style="color: #404040; font-weight: 400;">Transaction ID: ${transaction_uuid}</p>
  <p style="color: #404040; font-weight: 400;">Quantity: ${quantity}</p>
  <p style="color: #404040; font-weight: 400;">Price per Unit: ${priceOfSingleProduct}</p>
  <p style="color: #404040; font-weight: 400;">Booking Date: ${formattedBookingDate}</p>
  <p style="color: #404040; font-weight: 400;">Duration (in hours): ${durationInHour}</p>
  <p style="color: #404040; font-weight: 400;">Total Price: ${totalPriceInRs}</p>
  <p style="color: #404040; font-weight: 400;">Do not share your order Id!</p>
  <p style="color: #404040; font-weight: 400;">Feel free to reach out with any questions!</p>
  <p style="font-weight: 600; color: #404040;">Pokhara rental Team</p>
  </div>`;
}
