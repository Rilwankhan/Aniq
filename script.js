// ===== PRODUCT DATA =====
const products = [
  { id: 1, name: "Blush Chiffon Hijab", price: 2499, image: "product-1.jpg", rating: 4.8, reviews: 124, tag: "Best Seller", type: "chiffon" },
  { id: 2, name: "Dusty Rose Silk Hijab", price: 4199, image: "product-2.jpg", rating: 4.9, reviews: 89, tag: "Premium", type: "silk" },
  { id: 3, name: "Ivory Satin Hijab", price: 3299, image: "product-3.jpg", rating: 4.7, reviews: 156, tag: "New", type: "silk" },
  { id: 4, name: "Mauve Chiffon Hijab", price: 2499, image: "product-4.jpg", rating: 4.6, reviews: 98, tag: null, type: "chiffon" },
  { id: 5, name: "Sage Green Chiffon", price: 2499, image: "product-5.jpg", rating: 4.8, reviews: 67, tag: "New", type: "chiffon" },
  { id: 6, name: "Navy Blue Silk Hijab", price: 4199, image: "product-6.jpg", rating: 4.9, reviews: 203, tag: "Best Seller", type: "silk" },
  { id: 7, name: "Classic Black Chiffon", price: 2299, image: "product-7.jpg", rating: 4.8, reviews: 312, tag: null, type: "chiffon" },
  { id: 8, name: "Taupe Silk Hijab", price: 3799, image: "product-8.jpg", rating: 4.7, reviews: 76, tag: "Premium", type: "silk" },
];

const wishlist = new Set();

// ===== RENDER PRODUCTS =====
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  let filtered = products;
  if (filter === "chiffon") filtered = products.filter(p => p.type === "chiffon");
  else if (filter === "silk") filtered = products.filter(p => p.type === "silk");
  else if (filter === "new") filtered = products.filter(p => p.tag === "New");
  else if (filter === "best-seller") filtered = products.filter(p => p.tag === "Best Seller");

  grid.innerHTML = filtered.map((p, i) => {
    const stars = Array.from({ length: 5 }, (_, j) =>
      `<span class="star${j < Math.floor(p.rating) ? "" : " empty"}">${j < Math.floor(p.rating) ? "★" : "☆"}</span>`
    ).join("");

    return `
      <div class="product-card fade-in" style="transition-delay:${i * 80}ms">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="600">
          ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
          <button class="wishlist-btn ${wishlist.has(p.id) ? "active" : ""}" onclick="toggleWishlist(${p.id})">
            ${wishlist.has(p.id) ? "♥" : "♡"}
          </button>
          <button class="add-to-cart-btn">🛍 Add to Cart</button>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <div class="product-stars">${stars}<span>(${p.reviews})</span></div>
          <p class="product-price">₹${p.price.toLocaleString("en-IN")}</p>
        </div>
      </div>
    `;
  }).join("");

  // Re-trigger fade-in
  requestAnimationFrame(() => {
    grid.querySelectorAll(".fade-in").forEach(el => el.classList.add("visible"));
  });
}

function toggleWishlist(id) {
  if (wishlist.has(id)) wishlist.delete(id);
  else wishlist.add(id);
  const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  renderProducts(activeFilter);
}

// ===== FILTER BUTTONS =====
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// ===== STICKY NAVBAR =====
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// ===== MOBILE MENU =====
document.getElementById("mobileToggle").addEventListener("click", () => {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("open");
  document.getElementById("mobileToggle").textContent = menu.classList.contains("open") ? "✕" : "☰";
});
document.querySelectorAll("#mobileMenu a").forEach(a => {
  a.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("open");
    document.getElementById("mobileToggle").textContent = "☰";
  });
});

// ===== NEWSLETTER =====
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("newsletterForm").style.display = "none";
  document.getElementById("newsletterSuccess").style.display = "block";
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// ===== INIT =====
renderProducts();
