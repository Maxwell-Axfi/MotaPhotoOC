// Ouverture et fermeture de la popup
jQuery(document).ready(function($) {
    let referenceText;
    const modalOpenButton = $('.open_modale');
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

        // Obtient les attributs de données de l'option correspondante dans le select HTML d'origine
        let originalOption = originalSelect.options[j];
        let dataValue = selectElement.options[j].getAttribute('value');
        let dataNonce = originalOption.getAttribute('data-nonce');
        let dataAction = originalOption.getAttribute('data-action');
        let dataAjaxUrl = originalOption.getAttribute('data-ajaxurl');
        
        // Stocke les attributs de données dans des attributs de données personnalisés de l'option de votre select personnalisé
        option.setAttribute('data-value', dataValue);
        option.setAttribute('data-nonce', dataNonce);
        option.setAttribute('data-action', dataAction);
        option.setAttribute('data-ajaxurl', dataAjaxUrl);

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
    let options = document.querySelectorAll('.accueil__filtres-conteneur .select-items > div');

    function loadPosts() {
        console.log("La valeur du select a changé.");

        // Récupère la valeur de l'option sélectionnée du select #category
        let selectCategory = document.getElementById('category');
        let categorySlug = selectCategory.value; // Utiliser .value directement pour obtenir la valeur de l'option sélectionnée
        console.log("Catégorie sélectionnée : " + categorySlug);

        // Récupère la valeur de l'option sélectionnée du select #format
        let selectFormat = document.getElementById("format");
        let format = selectFormat.value;
        console.log("Catégorie sélectionnée : " + format);

        // Récupère la valeur de l'option sélectionnée du select #sort
        let selectTri = document.getElementById("sort");
        let tri = selectTri.value;
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
    options.forEach(option => {
        option.addEventListener('click', function() {
            pageNumber = 1;
            loadPosts();
        });
    });

    // Gestion du numéro de la page
    let pageNumber = 1;
    let chargerPlus = document.getElementById('load-more-button');

    chargerPlus.addEventListener('click', function() {
        pageNumber++;
        loadPosts();
    });

    // Appel initial pour charger les premiers posts
    loadPosts();
});




// Lightbox avec AJAX

// Attendre que le document HTML soit prêt avant d'exécuter le code
jQuery(document).ready(function($) {
    // Sélectionne les éléments du DOM pour les boutons de fermeture, flèche droite et flèche gauche
    let fullscreenButton = document.querySelectorAll('.photo-block__overlay-fullscreen');
    let fermetureLightbox = $('.lightbox__close');

    // Quand on clique sur un bouton "Fullscreen"
    fullscreenButton.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Empêchez le comportement par défaut du lien
            event.preventDefault();

            // Récupérez l'ID de la photo associée
            let postId = this.closest('.photo-block__container').querySelector('.photo-block__img').getAttribute('data-id');

            // Utilisez AJAX pour obtenir les informations du post
            getPostInfo(postId);
        });
    });

    // Fonction pour récupérer les informations du post sans recharger la page
    function getPostInfo(postId) {
        jQuery.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'get_post_info',
                post_id: postId
            },
            success: function(response) {
                // Mettez à jour la lightbox avec les nouvelles informations
                $('.lightbox__container').html(response.data);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});




/*

//Ajax
(function ($) {
    $(document).ready(function () {
        let currentPage = 2; // Commencer à partir de la deuxième page

    updateButton(body.data.no_more_posts);

    console.log('Filtration Response:', body);

    if (body.data.posts) {
        console.log('Filtered Posts:', body.data.posts);
    } else {
        console.warn('Aucun post filtré trouvé. Response complète:', body);
    }

    return true;
};

        
        

        const loadMorePhotos = function () {
            const $button = $(this);
            const ajaxurl = $button.data('ajaxurl');
            const data = {
                action: 'load_photos',
                nonce: $button.data('nonce'),
                paged: currentPage, // Utilisation de la variable de pagination
                category: $('#category').val() || '', // Ajout de la catégorie actuelle
                format: $('#format').val() || '', // Ajout du format actuel
                sort: $('#sort').val() || '', // Ajout du tri actuel
            };

            console.log('Ajax URL:', ajaxurl);
            console.log('Data:', data);

            ajaxCall(ajaxurl, data, (body) => {
                if (handleAjaxResponse(body, (noMorePosts) => {
                    const $photosContainer = $('.photo-block');

                    console.log('Current Page:', currentPage);
                    console.log('No More Posts:', noMorePosts);

                    const tempDiv = $('<div>').html(body.data.html);
                    const newPhotos = tempDiv.find('.photo-block');

                    console.log('New Photos:', newPhotos);

                    $photosContainer.append(newPhotos); // Ajouter au contenu existant

                    if (noMorePosts) {
                        $button.hide(); // Masquer le bouton s'il n'y a plus de posts à charger
                    } else {
                        currentPage++; // Incrémenter la page actuelle
                    }
                })) {
                    // Handle other actions if needed
                }
            }, (error) => {
                console.error('Erreur lors de la requête Ajax:', error);
                alert('Une erreur inattendue s\'est produite. Veuillez réessayer.');
            });
        };

        const updateLoadMoreButton = (noMorePosts) => {
            const $button = $('.accueil__button');
            const $photosContainer = $('.photo-block');

            if (noMorePosts || $photosContainer.find('.photo-block').length === 0) {
                $button.hide();
            } else {
                $button.show();
            }
        };

        const handleFiltrationChange = function () {
            const category = $('#category').val() || '';
            const format = $('#format').val() || '';
            const sort = $('#sort').val() || '';

            console.log('Selected category:', category);
            console.log('Selected format:', format);
            console.log('Selected sort:', sort);

            currentPage = 2; // Commencer à partir de la première page lors de la filtration

            const data = {
                action: 'filtration',
                category: category,
                format: format,
                sort: sort,
                nonce: ajax_object.nonce,
            };

            console.log('Ajax data:', data);

            ajaxCall(ajax_object.ajax_url, data, (body) => {
                if (handleAjaxResponse(body, (noMorePosts) => {
                    const $photosContainer = $('.photo-block');

                    console.log('Filtration Response:', body);
                    console.log('No More Posts (Filtration):', noMorePosts);

                    // Log the posts array
                    console.log('Filtered Posts:', body.data.posts);

                    const tempDiv = $('<div>').html(body.data.html);
                    const newPhotos = tempDiv.find('.photo-block');

                    console.log('New Photos (Filtration):', newPhotos);

                    $photosContainer.html(newPhotos); // Remplacer le contenu existant par les nouvelles photos
                    updateLoadMoreButton(noMorePosts);
                    $('.accueil__button').data('paged', currentPage); // Mettre à jour le numéro de page du bouton
                })) {
                    // Handle other actions if needed
                }
            }, (error) => {
                console.error('Ajax Error:', error);
            });
        };

        $('.accueil__button').click(function (e) {
            e.preventDefault();
            loadMorePhotos.call(this);
        });

        $('#category, #format, #sort').change(handleFiltrationChange);
    });
})(jQuery);
*/