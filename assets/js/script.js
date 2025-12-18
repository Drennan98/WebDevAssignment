// Filter products by category and update active button state
function filterProducts(category, btnElement) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Reset active state on all filter buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Set active state on clicked button
    if (btnElement) btnElement.classList.add('active');

    // Show or hide products based on selected category
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        product.style.display =
            (category === 'all' || category === productCategory)
                ? 'block'
                : 'none';
    });
}

document.addEventListener("DOMContentLoaded", () => {

    // Load cart from localStorage or initialise empty cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cache DOM elements for cart functionality
    const cartCountElement = document.getElementById("cart-count");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");

    const cartList = document.getElementById("cart-items");
    const cartEmptyMsg = document.getElementById("empty-cart");
    const cartTotalElement = document.getElementById("cart-total");
    const toast = document.getElementById("toast");

    // Open cart drawer
    document.querySelector(".cart-icon").addEventListener("click", () => {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("show");
        renderCart();
    });

    // Close cart drawer
    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("show");
    }

    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    // Update cart item counter in header
    function updateCartCounter() {
        cartCountElement.innerText = cart.length;
    }

    // Add product to cart
    document.querySelectorAll(".add-cart-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");

            // Extract product details
            const title = card.querySelector("h3").innerText;
            const price = parseFloat(
                card.querySelector(".price").innerText.replace("€", "")
            );

            // Generate unique ID for cart item
            const id = `${title}-${Date.now()}`;

            cart.push({ id, title, price });

            saveCart();
            updateCartCounter();
            showToast();
        });
    });

    // Display temporary toast notification
    function showToast() {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    }

    // Persist cart data to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Render cart items and calculate total
    function renderCart() {
        cartList.innerHTML = "";

        // Handle empty cart state
        if (cart.length === 0) {
            cartEmptyMsg.style.display = "block";
            cartTotalElement.innerText = "0.00";
            return;
        }

        cartEmptyMsg.style.display = "none";

        let total = 0;

        // Create cart item elements
        cart.forEach((item, index) => {
            total += item.price;

            const li = document.createElement("li");
            li.classList.add("cart-item");

            li.innerHTML = `
                <span>${item.title} – €${item.price.toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">X</button>
            `;

            cartList.appendChild(li);
        });

        // Update cart total
        cartTotalElement.innerText = total.toFixed(2);

        // Attach remove item handlers
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                updateCartCounter();
                renderCart();
            });
        });
    }

    // Initialise cart counter on page load
    updateCartCounter();
});

// Scroll-to-top button functionality
const scrollTopButton = document.getElementById('scrollTopButton');

window.addEventListener('scroll', () => {
    scrollTopButton.style.display =
        window.scrollY > 900 ? 'block' : 'none';
});

// Smooth scroll back to top
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile menu visibility
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
