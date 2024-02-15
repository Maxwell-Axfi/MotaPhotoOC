<?php 
// Récupérer l'ID du post à partir des paramètres
$post_id = isset($args['post_id']) ? intval($args['post_id']) : 0;

//Flèches précédent et suivant

$reference = get_field('reference', $post_id);
$category = get_the_category($post_id);
$category_name = !empty($category) ? esc_html($category[0]->name) : '';
$thumbnail_url = get_the_post_thumbnail_url($post_id, 'full');
?>

<div class="lightbox" id="lightbox-<?php echo esc_attr($post_id); ?>" data-post-id="<?php echo esc_attr($post_id); ?>">
  <a class="lightbox__close"><img class="fermer" src="<?php echo get_stylesheet_directory_uri() . '/assets/croix.svg'; ?>" /></a>
  <a class="lightbox__next"><img class="fleche droite" src="<?php echo get_stylesheet_directory_uri() . '/assets/grande-fleche-droite.svg'; ?>"/>Suivant</a>
  <a class="lightbox__prev"><img class="fleche gauche" src="<?php echo get_stylesheet_directory_uri() . '/assets/grande-fleche-gauche.svg'; ?>"/>Précédent</a>
  
  <div class="lightbox__container">
    <img class="lightbox__image" data-id="<?php echo esc_attr($post_id); ?>" src="<?php echo esc_url($thumbnail_url); ?>" alt="<?php echo esc_attr(get_the_title($post_id)); ?>">
    <p class="lightbox-texte lightbox-reference"><?php echo esc_html($reference) ?></p>
    <p class="lightbox-texte lightbox-categorie"><?php echo esc_html($category_name) ?></p>
  </div>
</div>