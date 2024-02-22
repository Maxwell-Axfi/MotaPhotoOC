<div class="lightbox__overlay close fadeout">
  <div class="lightbox">
    <div class="lightbox__close-container">
      <img class="lightbox__close" src="<?php echo get_stylesheet_directory_uri() . '/assets/croix.svg'; ?>" />
    </div>
    <div class="lightbox__container">
      <a class="lightbox__prev">
        <div class="fleche-lightbox__container">  
          <img class="fleche-lightbox gauche" src="<?php echo get_stylesheet_directory_uri() . '/assets/grande-fleche-gauche.svg'; ?>"/>
        </div>
        <p class="precedent">Précédent</p>
      </a>
      <div class="lightbox__infos-container">
        <img class="lightbox__image visible" src="" alt="" />         
        <div class="lightbox__loader hidden"></div>
        <div class="lightbox__infos">
          <p class="lightbox__texte lightbox-reference visible"></p>
          <p class="lightbox__texte lightbox-categorie visible"></p>
        </div>
      </div>
      <a class="lightbox__next"><p class="suivant">Suivant</p>
        <div class="fleche-lightbox__container">
          <img class="fleche-lightbox droite" src="<?php echo get_stylesheet_directory_uri() . '/assets/grande-fleche-droite.svg'; ?>"/>
        </div>
      </a>
    </div>
  </div>
</div>
