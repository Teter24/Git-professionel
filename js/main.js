// ===== Éléments DOM =====
const cartIcon = document.querySelector('.cart-icon');
const addToCartButtons = document.querySelectorAll('.product-card .btn-outline');
const newsletterForm = document.querySelector('.newsletter-form');
const navLinks = document.querySelectorAll('.nav a');

// ===== Fonctionnalité du Panier =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = cart.length;
    console.log(`Articles du panier: ${cartCount}`);
    // Vous pouvez mettre à jour un badge de compteur de panier ici si vous en ajoutez un au HTML
}

function addToCart(productName, productPrice) {
    const product = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        quantity: 1
    };
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Afficher un retour
    showNotification(`${productName} ajouté au panier!`);
}

// Ajouter des écouteurs d'événements aux boutons "Ajouter au panier"
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
        addToCart(productName, productPrice);
        
        // Retour du bouton
        const originalText = this.textContent;
        this.textContent = '✓ Ajouté!';
        this.style.backgroundColor = '#27ae60';
        this.style.color = '#fff';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
            this.style.color = '';
        }, 2000);
    });
});

// ===== Clic sur l'icône du Panier =====
cartIcon.addEventListener('click', function() {
    if (cart.length > 0) {
        showNotification(`Vous avez ${cart.length} article(s) dans votre panier`);
    } else {
        showNotification('Votre panier est vide');
    }
});

// ===== Formulaire d'Infolettre =====
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification(`Merci! Vérifiez votre email à ${email}`);
        this.reset();
        
        // Optionnel: Enregistrer l'email dans localStorage
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
        }
    }
});

// ===== Défilement Lisse de la Navigation =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Empêcher le comportement par défaut uniquement pour les liens internes
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

// ===== Fonction de Notification =====
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
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
    
    document.body.appendChild(notification);
    
    // Ajouter l'animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Supprimer la notification automatiquement
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Initialisation =====
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    console.log('Site web chargé avec succès');
    
    // Ajouter un effet d'ombre à l'en-tête au défilement
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

// ===== Chargement Paresseux des Images =====
const images = document.querySelectorAll('img');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}
