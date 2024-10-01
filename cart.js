// Product class to store product details
class Product {
    constructor(id, name, price, imageUrl) {
      this.id = id;
      this.name = name;
      this.price = price; // Price in Ksh
      this.imageUrl = imageUrl; // Added image URL property
    }
  }
  
  // ShoppingCartItem class to store the product and quantity
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity; // Returns total price in KES
    }
  }
  
  // ShoppingCart class to manage the cart items
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const cartItem = new ShoppingCartItem(product, quantity);
        this.items.push(cartItem);
      }
      this.displayCart();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.displayCart();
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    displayCart() {
      const cartItemsDiv = document.getElementById('cart-items');
      cartItemsDiv.innerHTML = ''; // Clear the cart display
  
      this.items.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
          <img src="${item.product.imageUrl}" alt="${item.product.name}">
          <div>
            <h4>${item.product.name}</h4>
            <p>Quantity: ${item.quantity}</p>
            <p>Total Price: ${item.getTotalPrice()} KES</p>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
          </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
      });
  
      document.getElementById('total-items').innerText = this.getTotalItems();
      document.getElementById('total-price').innerText = this.getTotalPrice();
    }
  }
  
  // Instantiate the shopping cart
  const cart = new ShoppingCart();
  
  // Define available products
  const products = [
    new Product(1, 'Laptop', 100000, 'Products/laptop.jpeg'),
    new Product(2, 'Phone', 50000, 'Products/Phone.jpeg'),
    new Product(3, 'Tablet', 30000, 'Products/tablet.jpeg'),
    new Product(4, 'Headphones', 15000, 'Products/headphones.jpeg'),
    new Product(5, 'Smartwatch', 20000, 'Products/smartwatch.jpg'),
  ];
  
  // Function to add products to the cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.addItem(product, 1);
  }
  
  // Function to remove products from the cart
  function removeFromCart(productId) {
    cart.removeItem(productId);
  }
  