// Ouverture et fermeture de la popup
jQuery(document).ready(function() {
    let referenceText;
    const modalOpenButton = jQuery('.open_modale');
    const modalOpenButtonNav = jQuery('.open_modale_nav');
    const modalOverlay = jQuery('.overlay');
    const modalContent = jQuery('.modale');
    const body = jQuery('body');


    // Ouverture de la modale lorsque l'on clique sur "Contact" de la navbar
    modalOpenButtonNav.on("click", function(event) {
        // Empêcher l'événement du clic à côté de la modale
        event.stopPropagation();
        toggleModal();
    });

// Ouverture de la modale lorsque l'on clique sur "Contact" dans les photos
    modalOpenButton.on("click", function(event) {
        // Empêcher l'événement du clic à côté de la modale
        event.stopPropagation();

        // Récupérer la référence présente sur la page
        const referenceElement = jQuery('.single-photo__infos--reference');
        if (referenceElement.length === 0) return;

        // Utiliser .text() directement sur l'élément pour obtenir le texte à l'intérieur
        const referenceText = referenceElement.text().trim();

        // Ajouter la référence au champ du formulaire
        const referenceField = jQuery('[name="ref-photo"]');
        if (referenceField.length === 0) return;

        if (referenceText) {
            referenceField.val(referenceText);

            // Puis on appelle toggleModal ici
            toggleModal(referenceText);
        }
    });


    // Fermeture de la modale lorsque l'on clique à côté
    jQuery(document).on("click", function(event) {
        const clickedElement = jQuery(event.target);

        // Vérifier si la modale est ouverte et si l'élément cliqué n'est pas un descendant direct de la modale
        if (modalOverlay.hasClass('open') && !modalContent.is(clickedElement) && modalContent.has(clickedElement).length === 0) {
            closeModal();
        }
    });

    // Fermeture de la modale lorsque l'on appuie sur échap
    jQuery(document).on("keydown", function(event) {
        if (event.key === "Escape" && modalOverlay.hasClass('open')) {
            closeModal();
        }
    });

    // Fonction pour ouvrir ou fermer la modale + gestion scroll
    function toggleModal(referenceText) {
        if (modalOverlay.hasClass('open')) {
            modalOverlay.removeClass('open').addClass('fadeout');
            setTimeout(function() {
                modalOverlay.addClass('close');
                body.removeClass('modal-open');
            }, 500);
        } else {
            modalOverlay.removeClass('close').addClass('open');
            body.addClass('modal-open');
            modalOverlay.removeClass('fadeout');
        }
    }

    // Fonction pour fermer la modale, seulement si elle est déjà ouverte + gestion scroll
    function closeModal() {
        if (modalOverlay.hasClass('open')) {
            modalOverlay.removeClass('open').addClass('fadeout');
            setTimeout(function() {
                modalOverlay.addClass('close');
                body.removeClass('modal-open');
            }, 500);
        }
    }
});



/* Apparission miniature au survol des flèches */
    document.addEventListener('DOMContentLoaded', function() {
        var tailleFleche1 = document.querySelector('.single-photo__taille-fleche1');
        var tailleFleche2 = document.querySelector('.single-photo__taille-fleche2');
        var previousImg = document.querySelector('.miniature.previous-img');
        var nextImg = document.querySelector('.miniature.next-img');

        if (tailleFleche1 && previousImg) {
            handleHover(tailleFleche1, previousImg, 1);
        }
    
        if (tailleFleche2 && nextImg) {
            handleHover(tailleFleche2, nextImg, 1);
        }
    
        function handleHover(element, targetImg, opacityValue) {
            element.addEventListener('mouseover', function() {
                targetImg.style.opacity = opacityValue;
            });
    
            element.addEventListener('mouseout', function() {
                targetImg.style.opacity = 0;
            });
        }
    });