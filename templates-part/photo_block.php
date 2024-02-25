<?php
// Récupère la variable $post_ids du tableau de paramètres
$post_ids = $args['post_ids'];

if (!empty($post_ids)) :
    foreach ($post_ids as $post_id) :

        // Récupérer la référence de la photo
        $reference = get_field('reference', $post_id);

        // Récupérer la catégorie de la photo
        $category = get_the_category($post_id);
        $category_name = !empty($category) ? esc_html($category[0]->name) : '';

        // Récupérer l'url de la photo
        $thumbnail_src = get_the_post_thumbnail_url($post_id, 'large');
    ?>

        <div class="photo-block__container">
            <img class="photo-block__img" src="<?php echo esc_url($thumbnail_src); ?>" alt="<?php echo esc_attr(get_the_title($post_id)); ?>" />
            <div class="photo-block__overlay">
                <img class="photo-block__overlay-fullscreen lightbox-trigger"
                src="<?php echo get_stylesheet_directory_uri() . '/assets/fullscreen.svg';  ?>" 
                alt="Cliquez pour voir la photo en plein écran"
                data-src="<?php echo esc_url($thumbnail_src);?>"
                data-alt="<?php echo esc_attr(get_the_title($post_id));?>"
                data-category="<?php echo esc_html($category_name);?>"
                data-reference="<?php echo esc_html($reference);?>" />
                <a class="photo-block__overlay-lien" href="<?php echo esc_url(get_permalink($post_id)) ?>"><img class="overlay-oeil" src="<?php echo get_stylesheet_directory_uri() . '/assets/oeil.svg';  ?>" alt="Cliquez pour accéder à la photo" /></a>
                <p class="photo-block__overlay-texte photo-block__overlay-reference"><?php echo esc_html($reference) ?></p>
                <p class="photo-block__overlay-texte photo-block__overlay-categorie"><?php echo esc_html($category_name) ?></p>
            </div>
        </div>
    <?php endforeach; ?>
<?php else : ?>
    <p>Aucune photo trouvée.</p>
<?php endif; ?>