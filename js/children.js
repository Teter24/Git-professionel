// ===== Données produits Enfants =====
const produitsEnfants = [
    {
        id: 1,
        nom: "Air Max Fun",
        price: 89,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        badge: "Nouveau"
    },
    {
        id: 2,
        nom: "Revolution Mini",
        price: 75,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&q=80",
        badge: "Tendance"
    },
    {
        id: 3,
        nom: "Flex Runner",
        price: 80.75,
        originalPrice: 95,
        image: "https://images.unsplash.com/photo-1607522369075-5c3aeb4d4c15?w=300&q=80",
        badge: "-15%"
    },
    {
        id: 4,
        nom: "Court Classique",
        price: 85,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&q=80",
        badge: null
    }
];

let cartEnfants = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Éléments DOM =====
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartIcon = document.querySelector('.cart-icon');

// ===== Ajouter au panier =====
function ajouterAuPanierEnfants(produit) {
    const itemExistant = cartEnfants.find(item => item.id === produit.id);
    
    if (itemExistant) {
        itemExistant.quantity += 1;
    } else {
        cartEnfants.push({
            ...produit,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartEnfants));
    afficherNotificationEnfants(`${produit.nom} ajouté au panier!`);
}

// ===== Notifications =====
function afficherNotificationEnfants(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #333;
        color: #fff;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Initialisation =====
document.addEventListener('DOMContentLoaded', function() {
    // Boutons panier
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const productId = Array.from(addToCartButtons).indexOf(this) + 1;
            const produit = produitsEnfants.find(p => p.id === productId);
            
            if (produit) {
                ajouterAuPanierEnfants(produit);
                
                // Feedback visuel
                const originalText = this.textContent;
                this.textContent = '✓ Ajouté!';
                this.style.backgroundColor = '#27ae60';
                this.style.color = '#fff';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }, 2000);
            }
        });
    });

    // Panier
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length > 0) {
                afficherNotificationEnfants(`Vous avez ${cart.length} article(s) dans votre panier`);
            } else {
                afficherNotificationEnfants('Votre panier est vide');
            }
        });
    }

    // Scroll lisse
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    console.log('Children.js chargé avec succès');
});
