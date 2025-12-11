function filterProducts(category, btnElement) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        product.style.display = (category === 'all' || category === productCategory)
            ? 'block'
            : 'none';
    });
}

document.addEventListener("DOMContentLoaded", () => {

    // Load saved cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCountElement = document.getElementById("cart-count");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");

    const cartList = document.getElementById("cart-items");
    const cartEmptyMsg = document.getElementById("empty-cart");
    const cartTotalElement = document.getElementById("cart-total");
    const toast = document.getElementById("toast");

    document.querySelector(".cart-icon").addEventListener("click", () => {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("show");
        renderCart();
    });

    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("show");
    }

    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    function updateCartCounter() {
        cartCountElement.innerText = cart.length;
    }

    document.querySelectorAll(".add-cart-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");

            const title = card.querySelector("h3").innerText;
            const price = parseFloat(card.querySelector(".price").innerText.replace("€", ""));
            const id = `${title}-${Date.now()}`;

            cart.push({ id, title, price });

            saveCart();
            updateCartCounter();
            showToast();
        });
    });

    // Show toast notification. 
    function showToast() {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    }

    // Save cart to localStorage. Cart is the key used. Cart being converted to string using JSON.stringify. 
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Render cart items. 
    function renderCart() {
        cartList.innerHTML = "";

        if (cart.length === 0) {
            cartEmptyMsg.style.display = "block";
            cartTotalElement.innerText = "0.00";
            return;
        }

        cartEmptyMsg.style.display = "none";

        let total = 0;

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

        cartTotalElement.innerText = total.toFixed(2);

        // Add delete handlers
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

    // Initial counter
    updateCartCounter();
});
