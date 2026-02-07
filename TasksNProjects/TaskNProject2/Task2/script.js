const form = document.getElementById('productForm');
const cartTableBody = document.querySelector('#cartTable tbody');

let products = JSON.parse(localStorage.getItem('products')) || [];

renderTable();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const category = document.getElementById('category').value;
  const image = document.getElementById('image').value.trim();

  if (!name || !price || !category || !image) {
    alert('Please fill out all fields.');
    return;
  }

  if (isNaN(price) || price <= 0) {
    alert('Price must be a number greater than 0.');
    return;
  }

  const product = { id: Date.now(), name, price, category, image };
  products.push(product);

  saveToLocalStorage();
  renderTable();
  form.reset();
});

function renderTable() {
  cartTableBody.innerHTML = '';

  if (products.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    return;
  }

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td><img src="${product.image}" alt="${product.name}"></td>
      <td><button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button></td>
    `;
    cartTableBody.appendChild(row);
  });
}

function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  saveToLocalStorage();
  renderTable();
}

function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}
