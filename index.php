<?php
/*
Template Name: Accueil
*/

 get_header() ?>


<?php
// WP_Query pour récupérer 8 posts du même custom post type
$args = array(
    'post_type' => 'photo',
    'posts_per_page' => 8,
);

$query = new WP_Query($args);

// WP_Query pour récupérer une image aléatoire
$arg_header = array(
    'post_type'      => 'photo',
    'posts_per_page' => 1,
    'orderby'        => 'rand', // Ordre aléatoire
);

$query_header = new WP_Query($arg_header);
?>


<div class="accueil__header">
    <h1 class="accueil__header-h1">Photographe event</h1>

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
</div>

<div class="accueil__photo-block">
<?php
    $post_ids = array();

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            $post_ids[] = get_the_ID();
        endwhile;
        wp_reset_postdata(); // Réinitialiser les données du post
     endif;

    // Utilisez get_template_part avec le deuxième paramètre pour passer les IDs des posts
    get_template_part('templates-part/photo_block', null, ['post_ids' => $post_ids]);
    ?>
</div>


<?php get_footer() ?>