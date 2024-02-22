// Ouverture et fermeture de la popup
jQuery(document).ready(function($) {
    let modalOpenButton = $('.open_modale');
    let modalOpenButtonNav = jQuery('.open_modale_nav');
    let modalOverlay = jQuery('.overlay');
    let modalContent = jQuery('.modale');
    let body = jQuery('body');


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
        let referenceElement = jQuery('.single-photo__infos--reference');
        if (referenceElement.length === 0) return;

        // Utiliser .text() directement sur l'élément pour obtenir le texte à l'intérieur
        let referenceText = referenceElement.text().trim();

        // Ajouter la référence au champ du formulaire
        let referenceField = jQuery('[name="ref-photo"]');
        if (referenceField.length === 0) return;

        if (referenceText) {
            referenceField.val(referenceText);

            // Puis on appelle toggleModal ici
            toggleModal(referenceText);
        }
    });


    // Fermeture de la modale lorsque l'on clique à côté
    jQuery(document).on("click", function(event) {
        let clickedElement = jQuery(event.target);

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
        let tailleFleche1 = document.querySelector('.single-photo__taille-fleche1');
        let tailleFleche2 = document.querySelector('.single-photo__taille-fleche2');
        let previousImg = document.querySelector('.miniature.previous-img');
        let nextImg = document.querySelector('.miniature.next-img');

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


// Style select
let customSelect, l, i, selectElement, j, ll, selectedOption, optionsContainer, option;
// Observe tous les éléments avec la classe accueil__filtres-conteneur et les stocke dans un tableau (NodeList) appelé customSelect
customSelect = document.getElementsByClassName("accueil__filtres-conteneur");

// Stocke la longueur du tableau customSelect dans la variable l
l = customSelect.length;

// Boucle à chaque élément accueil__filtres-conteneur
for (i = 0; i < l; i++) {

    // Sélectionne le premier élément de type "select" à l'intérieur de accueil__filtres-conteneur et le stocke dans Element + stocke la longueur du tableau dans ll
    selectElement = customSelect[i].getElementsByTagName("select")[0];
    ll = selectElement.length;

    // Crée une nouvelle div pour l'item sélectionné, ajoute la classe select-selected, remplit le texte de l'option sélectionnée et ajoute cet élément en tant qu'enfant de accueil__filtres-conteneur
    selectedOption = document.createElement("DIV");
    selectedOption.setAttribute("class", "select-selected");
    selectedOption.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    customSelect[i].appendChild(selectedOption);

    // Crée une nouvelle div contenant la liste des options
    optionsContainer = document.createElement("DIV");
    optionsContainer.setAttribute("class", "select-items select-hide");

    // Boucle à travers les options de la balise select
    for (j = 0; j < ll; j++) {
        
        // Crée une nouvelle div pour chaque option
        option = document.createElement("DIV");

        // Remplit le contenu HTML de l'élément option avec le texte de l'option
        option.innerHTML = selectElement.options[j].innerHTML;

        // Sélectionne l'élément select HTML d'origine
        let originalSelect = document.querySelector('.originalSelect');

        // Lorsque l'on clique sur une option, met à jour l'élément sélectionné dans la boîte select et l'option sélectionnée
        option.addEventListener("click", function(e) {
            let selectedOption, i, j, originalSelect, selectedOptionDisplay, l, ll;

            // Obtient l'index de l'option sélectionnée dans la liste déroulante personnalisée
            let selectedIndex = Array.from(this.parentNode.children).indexOf(this);

            // Remonte dans l'arbo du DOM, d'une option jusqu'au select parent
            originalSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
            l = originalSelect.length;

             // Met à jour l'index de l'option sélectionnée dans le select d'origine
            originalSelect.selectedIndex = selectedIndex;

            // Déclenchez un événement "change" sur le select d'origine pour que les événements change associés soient déclenchés
            originalSelect.dispatchEvent(new Event('change'));

             // Affiche dans la console la valeur et le texte de l'option sélectionnée côté front
            console.log("Option sélectionnée côté front - Texte:", this.innerHTML, "Valeur:", this.getAttribute('data-value'));

            // Affiche dans la console la valeur et le texte de l'option sélectionnée dans le select d'origine
            console.log("Option sélectionnée dans le select d'origine - Texte:", originalSelect.options[selectedIndex].innerHTML, "Valeur:", originalSelect.options[selectedIndex].value);

            // Cible la div contenant l'option sélectionnée
            selectedOptionDisplay = this.parentNode.previousSibling;

            // Boucle parmi les options de la balise select d'origine
            for (i = 0; i < l; i++) {

                // Condition qui vérifie si le texte de l'option dans le select correspond au texte de l'option cliquée
                if (originalSelect.options[i].innerHTML == this.innerHTML) {
                    
                    // Met à jour l'index de l'option sélectionnée dans la balise select d'origine
                    originalSelect.selectedIndex = i;

                    // Met à jour la boîte select avec le texte de l'option cliquée
                    selectedOptionDisplay.innerHTML = this.innerHTML;

                    // Stocke toutes les options avec la classe "same-as-selected" dans selectedOption
                    selectedOption = this.parentNode.getElementsByClassName("same-as-selected");
                    ll = selectedOption.length;    
                    
                    // Enlève la classe "same-as-selected" à tous les éléments qui l'ont déjà
                    for (j = 0; j < ll; j++) {
                        selectedOption[j].removeAttribute("class");
                    }

                    // Attribue la classe "same-as-selected" à l'option sélectionnée
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }

            // Simule un clic sur l'élément affichant l'option sélectionnée, ce qui déclenche la fermeture de la liste déroulante personnalisée
            selectedOptionDisplay.click();
        });

        // Ajoute l'élément option comme enfant de l'élément contenant la liste des options.
        optionsContainer.appendChild(option);
    }

    // Ajoute la liste des options et l'option sélectionnée en tant qu'enfant de la boîte select personnalisée
    customSelect[i].appendChild(optionsContainer);

    // Gestionnaire d'événements pour l'évenemment click sur selectedOption
    selectedOption.addEventListener("click", function(e) {

        // Empêche la propagation du click sur les éléments parents pour empêcher la fermeture de la boîte (puisqu'elle se ferme quand on clique ailleurs)
        e.stopPropagation();

        // Ferme toutes les autres boîtes de sélection, sauf celle sur laquelle on a cliqué
        closeAllSelect(this);

        // Alterne la classe "select-hide" sur la liste déroulante d'options pour permettre son ouverture ou sa fermeture.
        this.nextSibling.classList.toggle("select-hide");

        // Alterne la classe "select-arrow-active" pour modifier l'apparence de la flèche selon que la liste d'options est ouverte ou non
        this.classList.toggle("select-arrow-active");
    });
}

// Fonction pour fermer toutes les boîtes de sélection, sauf celle cliquée
function closeAllSelect(element) {
    let selectItems, selectSelected, i, l, ll, arrNo = [];
    selectItems = document.getElementsByClassName("select-items");
    selectSelected = document.getElementsByClassName("select-selected");
    l = selectItems.length;
    ll = selectSelected.length;
    
    for (i = 0; i < ll; i++) {
        if (element == selectSelected[i]) {
            arrNo.push(i)
        } else {
            selectSelected[i].classList.remove("select-arrow-active");
        }
    }

    for (i = 0; i < l; i++) {
      if (arrNo.indexOf(i)) {
        selectItems[i].classList.add("select-hide");
        }
    }
}

// Appelle la fonction closeAllSelect quand on clique partout ailleurs dans la page
document.addEventListener("click", closeAllSelect);




// Pagination et filtration avec AJAX
// Attendre que le document HTML soit prêt avant d'exécuter le code
jQuery(document).ready(function($) {

    // Sélectionne toutes les options de la liste déroulante personnalisée
    let options = $('.accueil__filtres-conteneur .select-items > div');

    function loadPosts() {
        console.log("La valeur du select a changé.");

        // Récupère la valeur de l'option sélectionnée du select #category
        let categorySlug = $('#category').val(); // Utiliser .value directement pour obtenir la valeur de l'option sélectionnée
        console.log("Catégorie sélectionnée : " + categorySlug);

        // Récupère la valeur de l'option sélectionnée du select #format
        let format = $('#format').val();
        console.log("Catégorie sélectionnée : " + format);

        // Récupère la valeur de l'option sélectionnée du select #sort
        let tri = $('#sort').val();
        console.log("Filtre sélectionnée : " + tri);

        console.log("Numéro de la page : " + pageNumber);

        $.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'filtration',
                category_slug: categorySlug, // Utilise "category_slug" pour transmettre le slug de la catégorie*
                format: format, // Utilise "format" pour transmettre le slug du format*
                tri: tri, // Utilise "tri" pour transmettre la value du tri*
                page: pageNumber,
            },

            success: function(response) {
                console.log("Réponse du serveur : ", response);
                // Vérifiez si la réponse est définie et si elle contient les données attendues
                if (response && response.success && response.data && response.data.html !== '') {
    
                    // S'il s'agit d'une opération de pagination, le numéro de page est forcément supérieur à 1. Donc si oui, on ajoute, si non, on remplace le contenu de .photo-block.
                    if (pageNumber > 1) {
                        $('.photo-block').append(response.data.html);
                    } else {
                    // Remplace le contenu de .photo-block par le HTML de la réponse
                    $('.photo-block').html(response.data.html);
                    }

                    // Mettre à jour le tableau lightboxData après avoir chargé de nouveaux posts
                    lightboxDataUpdate();

                    if (pageNumber >= response.data.total_pages) {
                        // Si le numéro de la page est supérieur ou égal au nombre total de pages, cacher le bouton "Charger plus"
                        $('#load-more-button').hide();
                    } else {
                        // Sinon, afficher le bouton "Charger plus"
                        $('#load-more-button').show();
                    }

                } else {
                    // Si aucune donnée n'est disponible, affichez "Aucune photo trouvée."
                    $('.photo-block').html('<p>Aucune photo trouvée.</p>');
                    // Cacher le bouton "Charger plus" s'il n'y a aucun post à afficher
                    $('#load-more-button').hide();
                }
            },   
            error: function(xhr, status, error) {
                console.log("Erreur AJAX : " + status + " - " + error);
            }             
        });
    };
    
    // Détecte quand on clique parmi toutes les options
    options.on('click', function() {
        pageNumber = 1;
        loadPosts();
    });

    // Gestion du numéro de la page
    let pageNumber = 1;
    let chargerPlus = $('#load-more-button');

    chargerPlus.on('click', function() {
        pageNumber++;
        loadPosts();
    });


    // Lightbox
    // Déclaration des variables
    let lightboxOverlay = $('.lightbox__overlay');
    let body = jQuery('body');

    // Ouvrir la lightbox
    function openLightbox() {
        if (lightboxOverlay.hasClass('close')) {
            lightboxOverlay.removeClass('close').addClass('open');
            lightboxOverlay.removeClass('fadeout');
            body.addClass('lightbox-open');
        }
    }

    // Fermer la lightbox
    function closeLightbox() {
        if (lightboxOverlay.hasClass('open')) {
            lightboxOverlay.removeClass('open').addClass('fadeout');
            setTimeout(function() {
                lightboxOverlay.addClass('close');
                body.removeClass('lightbox-open');
            }, 500);
        }
    }

    // Ferme la lightbox en cliquant sur la croix
    $(document).on('click', '.lightbox__close', function(event) {
        event.stopPropagation();
        closeLightbox();
    });

    // Ferme la lightbox en cliquant sur Echap
    $(document).on('keyup', function(event) {
        if (event.key === 'Escape' && lightboxOverlay.hasClass('open')) {
            closeLightbox();
        }
    });

    // Sélectionne les premiers boutons fullscreen
    let lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    // Réinitialise le tableau lightboxData à chaque appel de lightboxDataUpdate
    lightboxData = [];

    // Mettre à jour le tableau lightboxData avec les données des premiers éléments .lightbox-trigger (donc page accueil par défaut)
    lightboxDataUpdate();

    // Fonction pour gérer  la mise à jour du tableau lightboxData, donc toutes les data présentes dans les boutons fullscreen
    function lightboxDataUpdate() {

        // Réinitialise le tableau lightboxData à chaque appel de lightboxDataUpdate
        lightboxData = [];

        // Resélectionne bien tous les éléments .lightbox-trigger de la page (les boutons fullscreen)
        lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

        // Parcours chaque élément .lightbox-trigger pour mettre à jour le tableau lightboxData
        lightboxTriggers.forEach(function(e) {
            let src = e.getAttribute('data-src');
            let alt = e.getAttribute('data-alt');
            let reference = e.getAttribute('data-reference');
            let category = e.getAttribute('data-category');
        
            // Ajoute les données dans le tableau
            lightboxData.push ({
                src: src,
                alt: alt,
                reference: reference,
                category: category
            });
        });

        console.log("Contenu de lightboxData après la mise à jour : ", lightboxData);
    }

    // Gestion du clic sur les .lightbox-trigger avec délégation d'événements
    $(document).on('click', '.lightbox-trigger', function() {
        // Récupérer l'index du déclencheur
        let index = $(this).index('.lightbox-trigger');
        // Mettre à jour la lightbox avec les données correspondantes
        updateLightbox(index);
        // Ouvrir la lightbox
        openLightbox();
    });

    // Fonction pour mettre à jour la lightbox avec les données de l'élément à l'index spécifié
    function updateLightbox(index) {
        let lightboxImage = document.querySelector('.lightbox__image');
        let lightboxReference = document.querySelector('.lightbox-reference');
        let lightboxCategorie = document.querySelector('.lightbox-categorie');

        // Utilisez l'index pour accéder aux données dans le tableau lightboxData
        let data = lightboxData[index];

        // Mettez à jour les éléments de la lightbox avec les nouvelles données
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxReference.textContent = data.reference;
        lightboxCategorie.textContent = data.category;

        // Masquer ou afficher la flèche précédente en fonction de l'index
        if (index === 0) {
            lightboxPrev.style.visibility = "hidden";
        } else {
            lightboxPrev.style.visibility = "visible";
        }

        // Masquer ou afficher la flèche suivante en fonction de l'index
        if (index === lightboxData.length - 1) {
            lightboxNext.style.visibility = "hidden";
        } else {
            lightboxNext.style.visibility = "visible";
        }
    }

    // Gestion de la navigation avec les flèches
    let lightboxNext = document.querySelector('.lightbox__next');
    let lightboxPrev = document.querySelector('.lightbox__prev');

    lightboxNext.addEventListener('click', function() {
        // Obtenez l'index de l'élément actuellement affiché
        let currentIndex = lightboxData.findIndex(data => data.src === document.querySelector('.lightbox__image').src);

        // Si l'élément actuel n'est pas le dernier, passez à l'élément suivant
        if (currentIndex < lightboxData.length - 1) {
            updateLightbox(currentIndex + 1);
        }

        // Ajoutez la classe pour afficher la lightbox avec un effet de fondu
        $('.lightbox__infos-container').addClass('fadein');

        // Supprimez la classe après un délai pour que l'effet de fondu ne se reproduise pas à chaque fois
        setTimeout(function() {
            $('.lightbox__infos-container').removeClass('fadein');
        }, 750); // Ajustez le délai selon vos préférences, ici 300ms pour correspondre à la durée de la transition définie dans CSS
    });

    lightboxPrev.addEventListener('click', function() {
        // Obtenez l'index de l'élément actuellement affiché
        let currentIndex = lightboxData.findIndex(data => data.src === document.querySelector('.lightbox__image').src);

        // Si l'élément actuel n'est pas le premier, passez à l'élément précédent
        if (currentIndex > 0) {
            updateLightbox(currentIndex - 1);
        }

        // Ajoutez la classe pour afficher la lightbox avec un effet de fondu
        $('.lightbox__infos-container').addClass('fadein');

        // Supprimez la classe après un délai pour que l'effet de fondu ne se reproduise pas à chaque fois
        setTimeout(function() {
            $('.lightbox__infos-container').removeClass('fadein');
        }, 750); // Ajustez le délai selon vos préférences, ici 300ms pour correspondre à la durée de la transition définie dans CSS
    });
});


// MENU BURGER
document.addEventListener("DOMContentLoaded", function() {

    let burger = document.querySelector('.navbar__burger');
    let menuMobile = document.querySelector('.navbar__menu');
    let menuItems = document.querySelectorAll('.navbar__list > .menu-item');

    function displayBurger() {
        if (window.innerWidth <= 767) {
            // Si l'écran est de 767px ou moins
            burger.classList.remove('hidden');
            menuMobile.classList.add('close');
            menuMobile.classList.remove('open');
            burger.classList.remove('opened');
            // Activer les événements
            enableEvents();
        } else {
            // Si l'écran est plus grand que 767px
            burger.classList.add('hidden');
            openMenu();
            // Désactiver les événements
            disableEvents();
        }
    }

    // Refait displayBurger si la taille de la fenêtre change pour vérifier sa taille
    window.addEventListener('resize', displayBurger);

    // Exécuter une fois au chargement de la page pour initialiser les classes
    displayBurger();


    function toggleMenu() {
        if (menuMobile.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        menuMobile.classList.add('open');
        menuMobile.classList.remove('close');
        burger.classList.add('opened');
    }

    function closeMenu() {
        burger.classList.remove('opened');
        menuMobile.classList.add('close');
        setTimeout(function() {
            menuMobile.classList.remove('open');
        }, 1000);
    }

    function enableEvents() {
        // Gestion de l'événement de clic en dehors du menu pour le fermer
        document.addEventListener("click", clickOutsideMenu);

        // Gestion de l'événement de clic sur les liens du menu pour le fermer
        menuItems.forEach(function(item) {
            item.addEventListener('click', closeMenu);
        });

        // Gestion de l'événement de clic sur le bouton de déclenchement de la modale
        burger.addEventListener("click", toggleMenu);
    }


    function disableEvents() {
        // Retirer les gestionnaires d'événements
        document.removeEventListener("click", clickOutsideMenu);
        menuItems.forEach(function(item) {
            item.removeEventListener('click', closeMenu);
            console.log('Click');
        });
        burger.removeEventListener("click", toggleMenu);
    }

    function clickOutsideMenu(event) {
        if (!menuMobile.contains(event.target) && !burger.contains(event.target)) {
            closeMenu();
        }
    }
});