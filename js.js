        // Product data
        const products = [
            {
                id: 1,
                name: "Midnight Rose",
                category: ["women", "floral"],
                price: 89.99,
                description: "A captivating blend of Bulgarian rose, jasmine, and vanilla.",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.5
            },
            {
                id: 2,
                name: "Sandalwood Noir",
                category: ["men", "woody"],
                price: 79.99,
                description: "Earthy sandalwood with hints of cedar and amber.",
                image: "https://images.unsplash.com/photo-1590736969954-6488403955c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.8
            },
            {
                id: 3,
                name: "Ocean Breeze",
                category: ["unisex", "floral"],
                price: 69.99,
                description: "Fresh aquatic notes with citrus and sea salt accents.",
                image: "https://images.unsplash.com/photo-1543853121-5bf5c8ac5c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.3
            },
            {
                id: 4,
                name: "Velvet Orchid",
                category: ["women", "floral"],
                price: 99.99,
                description: "Luxurious orchid and black truffle with vanilla and rum.",
                image: "https://images.unsplash.com/photo-1590736969954-6488403955c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.7
            },
            {
                id: 5,
                name: "Tobacco Oud",
                category: ["men", "woody"],
                price: 109.99,
                description: "Rich tobacco leaves, oud wood, and spicy saffron.",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.9
            },
            {
                id: 6,
                name: "Citrus Bloom",
                category: ["unisex", "floral"],
                price: 74.99,
                description: "Zesty bergamot and grapefruit with white flowers.",
                image: "https://images.unsplash.com/photo-1543853121-5bf5c8ac5c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.4
            },
            {
                id: 7,
                name: "Musk Mystique",
                category: ["women", "floral"],
                price: 85.99,
                description: "Sensual white musk with peony and pink pepper.",
                image: "https://images.unsplash.com/photo-1590736969954-6488403955c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.6
            },
            {
                id: 8,
                name: "Leather & Spice",
                category: ["men", "woody"],
                price: 94.99,
                description: "Bold leather accord with black pepper and vetiver.",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                rating: 4.7
            }
        ];

        // Cart data
        let cart = [];
        let cartCount = 0;
        let cartTotal = 0;

        // DOM elements
        const productsContainer = document.getElementById('products-container');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cartToggle = document.getElementById('cart-toggle');
        const cartModal = document.getElementById('cart-modal');
        const closeCart = document.getElementById('close-cart');
        const overlay = document.getElementById('overlay');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalPrice = document.getElementById('cart-total-price');
        const cartCountElement = document.querySelector('.cart-count');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(products);
            setupEventListeners();
            updateCart();
        });

        // Render products to the page
        function renderProducts(productsToRender) {
            productsContainer.innerHTML = '';
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                // Generate star rating HTML
                const stars = generateStars(product.rating);
                
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <div class="product-category">${product.category[0].toUpperCase()}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div class="product-rating">${stars}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                
                productsContainer.appendChild(productCard);
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        // Generate star rating HTML
        function generateStars(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (halfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        // Filter products by category
        function filterProducts(category) {
            if (category === 'all') {
                renderProducts(products);
                return;
            }
            
            const filteredProducts = products.filter(product => 
                product.category.includes(category)
            );
            
            renderProducts(filteredProducts);
        }

        // Add product to cart
        function addToCart(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            // Update cart UI
            updateCart();
            
            // Show confirmation
            e.target.textContent = 'Added!';
            e.target.style.backgroundColor = '#8a6d3b';
            e.target.style.color = 'white';
            
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
                e.target.style.backgroundColor = '';
                e.target.style.color = '';
            }, 1000);
        }

        // Update cart UI
        function updateCart() {
            // Update cart count
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;
            
            // Update cart items
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: #777;">Your cart is empty</p>';
                cartTotalPrice.textContent = '$0.00';
                return;
            }
            
            // Calculate total
            cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartTotalPrice.textContent = `$${cartTotal.toFixed(2)}`;
            
            // Render cart items
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }

        // Remove item from cart
        function removeFromCart(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Setup event listeners
        function setupEventListeners() {
            // Filter buttons
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Filter products
                    const filter = button.getAttribute('data-filter');
                    filterProducts(filter);
                });
            });
            
            // Cart toggle
            cartToggle.addEventListener('click', () => {
                cartModal.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close cart
            closeCart.addEventListener('click', closeCartModal);
            overlay.addEventListener('click', closeCartModal);
            
            // Mobile menu toggle
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                });
            });
            
            // Newsletter form
            const newsletterForm = document.getElementById('newsletter-form');
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                if (email) {
                    alert(`Thank you for subscribing with ${email}!`);
                    newsletterForm.reset();
                }
            });
            
            // Checkout button
            const checkoutBtn = document.querySelector('.checkout-btn');
            checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                alert(`Thank you for your order! Total: $${cartTotal.toFixed(2)}`);
                cart = [];
                updateCart();
                closeCartModal();
            });
        }

        // Close cart modal
        function closeCartModal() {
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });