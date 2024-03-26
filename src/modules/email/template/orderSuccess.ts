import OrderEntity from "../../order/entities/order.entity";


export function OrderSuccesMessage(order: OrderEntity) {
  return `
  <div class="body"
  style=" margin-top: 1.7em; margin-bottom: 2em;">
 
      <p style="color: #404040; font-size:22px; font-weight: 400;">Your Order for ${order?.boat?.title || order?.cycle?.title} was successful. Please click in the button below to view order.</p>
  <button style="color: #404040; padding: 1rem 2rem; font-weight: 400;">View Details</button>
 
  <p style="color: #404040; font-weight: 400;">Feel free to
      reach out with any
      questions!</p>
  <p style="font-weight: 600; color: #404040;">Pokhara rental Team</p>
  </div>`;
}
