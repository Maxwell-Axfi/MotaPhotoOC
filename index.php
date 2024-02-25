<?php
/*
Template Name: Accueil
*/

 get_header()

// WP_Query pour récupérer x posts du même custom post type
$paged = get_query_var('paged') ? get_query_var('paged') : 1;

$args = array(
    'post_type' => 'photo',
    'posts_per_page' => get_option('posts_per_page'),
    'paged' => $paged,
);

$query = new WP_Query($args);

// WP_Query pour récupérer une image aléatoire
$arg_header = array(
    'post_type'      => 'photo',
    'posts_per_page' => 1,
    'orderby'        => 'rand', // Ordre aléatoire
);

$query_header = new WP_Query($arg_header);

//Récupérer titre du site
$titre_du_site = get_bloginfo('name');

// Récupérer les termes de la taxonomie 'category' pour le post type 'photo'

$all_categories = get_terms(array(
    'taxonomy'   => 'category',
    'exclude'    => get_cat_ID('Uncategorized'),
));

// Récupérer les termes de la taxonomie 'format' pour le post type 'photo'
$all_formats = get_terms(array(
    'taxonomy'   => 'format',
));
?>


<section class="accueil__header">
    
    <h1 class="accueil__header-h1"><?php echo $titre_du_site ?></h1>

    <?php // Vérifier si la requête a des posts
    if ($query_header->have_posts()) {
        // Boucler à travers les posts
        while ($query_header->have_posts()) {
            $query_header->the_post();

            // Obtenir l'URL de l'image
            $header_img_url = get_the_post_thumbnail_url();?>

            <img class="accueil__header-background" src="<?php echo esc_url($header_img_url) ?>" />
        
        <?php }

        // Réinitialiser les données du post
        wp_reset_postdata();
    }
    ?>
</section>

<section class="accueil__filtres">
    <div class="accueil__filtres-conteneur accueil__filtres-categories">    
        <select id="category" class="originalSelect">
            <option value="" selected>Catégories</option>
            <?php
            foreach ($all_categories as $category) {
                echo '<option value="' . esc_attr($category->slug) . '"
                class="categorie"
                data-nonce="' . wp_create_nonce('filtration') .'"
                data-action="filtration"
                data-ajaxurl="' . admin_url( 'admin-ajax.php' ) .'">
                ' . esc_html($category->name) . '</option>';
            }
            ?>
        </select>
    </div>

    <div class="accueil__filtres-conteneur accueil__filtres-formats">
        <select id="format" class="originalSelect">
            <option value="" selected>Formats</option>
        <?php
            foreach ($all_formats as $format) {
                echo '<option value="' . esc_attr($format->slug) . '"
                class="format"
                data-nonce="' . wp_create_nonce('filtration') .'"
                data-action="filtration"
                data-ajaxurl="' . admin_url( 'admin-ajax.php' ) .'">
                ' . esc_html($format->name) . '</option>';
            }
            ?>
        </select>
    </div>

    <div class="accueil__filtres-conteneur accueil__filtres-tri">
        <select id="sort" class="originalSelect">
            <option value="" selected>Trier par</option>
            <option value="DESC">À partir des plus récentes</option>
            <option value="ASC">À partir des plus anciennes</option>
        </select>
    </div>
</section>

<section class="accueil__photo-block">
    <div class="photo-block">
    <?php
    $post_ids = array();

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            $post_ids[] = get_the_ID();
        endwhile;

        // Vérifier si des posts ont été trouvés avant d'inclure le template partiel
        if (!empty($post_ids)) {
            // Utilisez get_template_part avec le deuxième paramètre pour passer les IDs des posts
            get_template_part('templates-part/photo_block', null, ['post_ids' => $post_ids]);
        }

        wp_reset_postdata(); // Réinitialiser les données du post
    endif;
    ?>
    </div>
</section>

<button
    id="load-more-button"
	class="button accueil__button"
    data-nonce="<?php echo wp_create_nonce('load_photos'); ?>"
    data-action="load_photos"
    data-paged="2"
    data-ajaxurl="<?php echo admin_url( 'admin-ajax.php' ); ?>">
    Charger plus</button>

<?php get_footer() ?>