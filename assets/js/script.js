/* ================================
   1. Product Filtering
================================ */
function filterProducts(category, btnElement) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    if (btnElement) {
        btnElement.classList.add('active');
    }

    // Show / hide products
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}



/* ================================
   2. Shop Cart Logic (Pro Shop)
================================ */
document.addEventListener("DOMContentLoaded", () => {

    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    const addButtons = document.querySelectorAll('.add-cart-btn');
    const toast = document.getElementById('toast');

    if (addButtons) {
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                cartCount++;
                if (cartCountElement) cartCountElement.innerText = cartCount;
                showToast();
            });
        });
    }

    function showToast() {
        if (!toast) return;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }



    /* ================================
       3. Membership Cart Logic
    ================================= */

    const membershipButtons = document.querySelectorAll(".membership-card .btn");
    const cartList = document.getElementById("cart-items");
    const cartEmptyMsg = document.getElementById("empty-cart");

    let membershipCart = null; // Start fully empty

    if (membershipButtons) {
        membershipButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();

                // Prevent adding more than one membership
                if (membershipCart !== null) {
                    alert("Only one membership can be added at a time. Remove the current one first.");
                    return;
                }

                const card = btn.closest(".membership-card");
                const title = card.querySelector("h3").innerText;
                const price = card.querySelector("p").innerText;

                membershipCart = { title, price };
                updateMembershipCart();
            });
        });
    }

    function updateMembershipCart() {
        if (!cartList || !cartEmptyMsg) return;

        cartList.innerHTML = "";
        cartEmptyMsg.style.display = "none";

        if (membershipCart === null) {
            cartEmptyMsg.style.display = "block";
            return;
        }

        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            <span>${membershipCart.title} – ${membershipCart.price}</span>
            <button onclick="removeMembership()">X</button>
        `;

        cartList.appendChild(li);
    }

    // Allow removal
    window.removeMembership = function() {
        membershipCart = null;
        updateMembershipCart();
    };

});
