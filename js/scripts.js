// Ouverture et fermeture de la popup
document.addEventListener("DOMContentLoaded", function modale() {
    const modalOpenButton = document.querySelector('.open_modale');
    const modalOverlay = document.querySelector('.overlay');
    const modalContent = document.querySelector('.modale');
    const body = document.querySelector('body');

    // Ouverture de la modale lorsque l'on clique sur "Contact"
    modalOpenButton.addEventListener("click", function(event) {
        // Empêcher l'évenement du clic à côté de la modale
        event.stopPropagation();
        toggleModal();
    });

    // Fermeture de la modale lorsque l'on clique à côté
    document.addEventListener("click", function(event) {
        if (modalOverlay.classList.contains('open') && !modalContent.contains(event.target)) {
            closeModal();
        }
    });

    // Fermeture de la modale lorsque l'on appuie sur échap
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });

    // Fonction pour ouvrir ou fermer la modale + gestion scroll
    function toggleModal() {

        if (modalOverlay.classList.contains('open')) {
            modalOverlay.classList.remove('open');
            modalOverlay.classList.add('fadeout')
            setTimeout(function() {
                modalOverlay.classList.add('close');
                body.classList.remove('modal-open');
            }, 500);
            
        } else {
            modalOverlay.classList.remove('close');
            modalOverlay.classList.add('open');
            body.classList.add('modal-open');
            modalOverlay.classList.remove('fadeout')
        }
    }

     // Fonction pour fermer la modale, seulement si elle est déjà ouverte + gestion scroll
    function closeModal() {
        if (modalOverlay.classList.contains('open')) {
            modalOverlay.classList.remove('open');
            modalOverlay.classList.add('fadeout')
            setTimeout(function() {
                modalOverlay.classList.add('close');
                body.classList.remove('modal-open');
            }, 500);
            
        }
    }
});
