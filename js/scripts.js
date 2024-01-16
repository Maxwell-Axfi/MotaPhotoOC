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


    // Ajax
    (function ($) {
        $(document).ready(function () {
    
            // Chargement des commentaires en Ajax
            $('.accueil__button').click(function (e) {
    
                // Empêcher l'envoi classique du formulaire
                e.preventDefault();
    
                // L'URL qui réceptionne les requêtes Ajax dans le data-ajaxurl du bouton
                const ajaxurl = $(this).data('ajaxurl');
    
                // Les données du bouton
                // ⚠️ Ne changez pas le nom "action" !
                const data = {
                    action: 'load_photos',
                    nonce: $(this).data('nonce'),
                    paged: $(this).data('paged') || 1,
                }
    
                // Pour vérifier qu'on a bien récupéré les données
                console.log('Ajax URL:', ajaxurl);
                console.log('Data:', data);
    
                // Requête Ajax en JS natif via Fetch
                fetch(ajaxurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-cache',
                    },
                    body: new URLSearchParams(data),
                })
                .then(response => response.json())
                .then(body => {
                    console.log('Ajax Response:', body);
    
                    // En cas d'erreur
                    if (!body.success) {
                        console.error('Erreur:', body.data);
                        alert('Erreur lors du chargement des photos. Veuillez réessayer.');
                        return;
                    }
    
                    // Et en cas de réussite
                    const $photosContainer = $('.accueil__photo-block'); // Mettez à jour la classe selon votre structure HTML
                    
                    // Créez un élément div temporaire pour contenir le HTML
                    const tempDiv = $('<div>').html(body.data.html);

                    // Utilisez insertBefore pour insérer le contenu avant le bouton
                    tempDiv.insertBefore('.accueil__button');
    
                    // Mettez à jour l'attribut data-paged pour la prochaine requête
                    $('.accueil__button').data('paged', body.data.paged);

                    // Vérifiez s'il y a plus de posts à charger
                    if (body.data.no_more_posts) {
                    $('.accueil__button').hide(); // Cache le bouton s'il n'y a plus de posts à charger
            }})

                .catch(error => {
                    console.error('Erreur lors de la requête Ajax:', error);
                    alert('Une erreur inattendue s\'est produite. Veuillez réessayer.');
                });
            });
        });
    })(jQuery);