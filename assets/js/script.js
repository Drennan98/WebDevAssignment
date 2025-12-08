/* --- 1. Product Filtering --- */
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

/* --- 2. Shopping Cart Logic --- */
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const addButtons = document.querySelectorAll('.add-cart-btn');
const toast = document.getElementById('toast');

// Add click event to every "Add to Cart" button
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Increment Counter
        cartCount++;
        cartCountElement.innerText = cartCount;

        // Show Toast Notification
        showToast();
    });
});

function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
