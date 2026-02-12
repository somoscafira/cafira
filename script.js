let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({name, price, qty:1});
  }
  updateCart();
  showNotification();
}

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <div class="qty-controls">
        <button onclick="changeQty('${item.name}', -1)">-</button>
        <button onclick="changeQty('${item.name}', 1)">+</button>
      </div>
    `;
    cartItems.appendChild(div);
  });
  document.querySelector('.total').innerText = `Total: $${total} COP`;
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  updateCart();
}

function showNotification() {
  const notif = document.querySelector('.notification');
  notif.classList.add('show', 'bounce');
  setTimeout(()=>{notif.classList.remove('show','bounce')},1000);
}

document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return alert("Carrito vacío");
  let text = "Hola! Quiero ordenar:\n";
  cart.forEach(i => {
    text += `${i.name} x${i.qty} = $${i.price*i.qty} COP\n`;
  });
  const url = `https://wa.me/573232928781?text=${encodeURIComponent(text)}`;
  window.open(url,'_blank');
});
// Animación fade-in al scroll para productos
const cards = document.querySelectorAll('.card');

function showCards() {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showCards);
window.addEventListener('load', showCards);
