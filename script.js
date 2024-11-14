// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];
  
  // Display products on the products page
  function displayProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
      });
    }
  }
  
  // Add product to cart
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
      // Check if product is already in the cart
      const existingProduct = cart.find(item => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if already in cart
      } else {
        cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    }
  }
  
  // Display cart items on the cart page
  function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
  
    if (cartItems) {
      cartItems.innerHTML = ''; // Clear existing items
      cart.forEach(item => {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-item');
        cartDiv.innerHTML = `
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Subtotal: $${item.price * item.quantity}</p>
        `;
        cartItems.appendChild(cartDiv);
  
        // Update total price
        total += item.price * item.quantity;
      });
  
      // Display total price
      const totalDiv = document.createElement('div');
      totalDiv.classList.add('cart-total');
      totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
      cartItems.appendChild(totalDiv);
    }
  }
  
  // Update cart count in the header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum up quantities
    document.getElementById('cart-count').innerText = itemCount;
  }
  
  // Clear cart
  function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
  }
  
  // Initial load functions
  document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
    updateCartCount();
  });

  