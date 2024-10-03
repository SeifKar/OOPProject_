// Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ShoppingCartItem Class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate the total price of this cart item
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart Class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Method to add an item to the cart
  addItem(product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = new ShoppingCartItem(product, 1);
      this.items.push(newItem);
    }
    this.displayCart();
  }

  // Method to remove an item from the cart
  removeItem(productId) {
    const itemIndex = this.items.findIndex(item => item.product.id === productId);
    if (itemIndex !== -1) {
      const item = this.items[itemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.items.splice(itemIndex, 1);
      }
    }
    this.displayCart();
  }

  // Method to delete an item completely from the cart
  deleteItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.displayCart();
  }

  // Method to calculate the total price of all items in the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Method to display the cart and update the total price
  displayCart() {
    const totalElement = document.querySelector('.total');
    totalElement.textContent = `${this.getTotal()} Ksh`;

    // Update quantity for each product in the UI
    this.items.forEach(item => {
      const productCard = document.querySelector(`.product-card[data-product="${item.product.name.toLowerCase()}"]`);
      const quantityElement = productCard.querySelector('.quantity');
      quantityElement.textContent = item.quantity;
    });
  }
}

// Initialize the cart
const cart = new ShoppingCart();

// Map of products to their instances
const products = {
  headphones: new Product(1, 'Headphones', 40000),
  laptop: new Product(2, 'Laptop', 250000),
  phone: new Product(3, 'Phone', 180000)
};

// Function to handle adding items
function handleAddItem(event) {
  const productElement = event.target.closest('.product-card');
  const productName = productElement.dataset.product;
  const product = products[productName.toLowerCase()];
  cart.addItem(product);
}

// Function to handle removing items
function handleRemoveItem(event) {
  const productElement = event.target.closest('.product-card');
  const productName = productElement.dataset.product;
  const product = products[productName.toLowerCase()];
  cart.removeItem(product.id);
}

// Function to handle deleting an item
function handleDeleteItem(event) {
  const productElement = event.target.closest('.product-card');
  const productName = productElement.dataset.product;
  const product = products[productName.toLowerCase()];
  cart.deleteItem(product.id);
}

// Function to handle liking an item
function handleLikeItem(event) {
  const heartIcon = event.target;
  heartIcon.classList.toggle('liked');
}

// Set up event listeners for each product card
document.querySelectorAll('.add-item').forEach(button => {
  button.addEventListener('click', handleAddItem);
});

document.querySelectorAll('.remove-item').forEach(button => {
  button.addEventListener('click', handleRemoveItem);
});

document.querySelectorAll('.fa-trash-alt').forEach(button => {
  button.addEventListener('click', handleDeleteItem);
});

document.querySelectorAll('.fa-heart').forEach(button => {
  button.addEventListener('click', handleLikeItem);
});

// Initialize the cart display
cart.displayCart();
