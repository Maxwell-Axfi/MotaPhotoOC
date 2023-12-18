<?php get_header()?>

<?php
// Récupérer l'ID de la photo actuelle
$post_id = get_the_ID();

// Récupérer le titre de la photo
$post_title = get_the_title($post_id);

// Récupérer la catégorie de la photo
$category = get_the_category($post_id);
$category_name = !empty($category) ? esc_html($category[0]->name) : '';

// Récupérer les termes de la taxonomie "Format" pour le post actuel
$format_terms = get_terms(array(
    'taxonomy' => 'format',
    'object_ids' => $post_id,
));

// Récupérer les champs ACF "Type" et "Référence"
$type = get_field('type', $post_id);
$reference = get_field('reference', $post_id);

// Récupérer l'année de publication du post
$year_published = get_the_date('Y');

// Récupérer l'ID de l'image mise en avant
$thumbnail_id = get_post_thumbnail_id($post_id);

// Récupérer l'URL de l'image mise en avant
$thumbnail_url = wp_get_attachment_image_src($thumbnail_id, 'full')[0];

/* NAVIGATION AVEC LES FLÈCHES */
// Configuration de l'argument de requête pour obtenir tous les articles triés par date
$args = array(
    'post_type'      => 'photo',
    'posts_per_page' => -1,
    'order'          => 'DESC',
    'orderby'        => 'date',
);

// Exécution de la requête pour obtenir tous les articles triés par date
$all_posts_query = new WP_Query($args);

// Récupération des ID de tous les articles triés par date
$all_posts_ids = wp_list_pluck($all_posts_query->posts, 'ID');

// Trouver l'index de l'article actuel dans le tableau
$current_index = array_search($post_id, $all_posts_ids);

// Récupérer l'ID de l'article précédent dans la boucle
$previous_post_id = isset($all_posts_ids[$current_index + 1]) ? $all_posts_ids[$current_index + 1] : reset($all_posts_ids);

// Récupérer l'ID de l'article suivant dans la boucle
$next_post_id = isset($all_posts_ids[$current_index - 1]) ? $all_posts_ids[$current_index - 1] : end($all_posts_ids);

// URL vers l'article précédent
$previous_post_link = get_permalink($previous_post_id);

// URL vers l'article suivant
$next_post_link = get_permalink($next_post_id);

// URL de la miniature pour l'article précédent
$previous_post_thumbnail_url = $previous_post_id ? get_the_post_thumbnail_url($previous_post_id) : '';

// URL de la miniature pour l'article suivant
$next_post_thumbnail_url = $next_post_id ? get_the_post_thumbnail_url($next_post_id) : '';


/* SECTION VOUS AIMEREZ AUSSI */

// Récupérer la catégorie du post actuel
$categories = get_the_category();
$category_slug = !empty($categories) ? $categories[0]->slug : '';

// WP_Query pour récupérer 2 posts du même custom post type et de la même catégorie
$related_posts_args = array(
    'post_type' => 'photo',
    'posts_per_page' => 2,
    'category_name' => $category_slug,
    'post__not_in' => array(get_the_ID()), // Exclure le post actuel de la liste
    'orderby' => 'rand', // Ordre aléatoire
);

$query = new WP_Query($related_posts_args);
?>


<section class="single-photo">
    <article class="single-photo__card">
        <div class="single-photo__col1">
            <h1 class="single-photo__title"><?php echo esc_html($post_title); ?></h1>
            <ul>
                <li class="single-photo__infos">Référence : <span class="single-photo__infos--reference"><?php echo esc_html($reference); ?></span></li>
                <li class="single-photo__infos">Catégorie : <?php echo $category_name; ?></li>
                <li class="single-photo__infos">Format :
                <?php if (!empty($format_terms) && !is_wp_error($format_terms)) {
                        foreach ($format_terms as $format_term) {
                            echo esc_html($format_term->name) ;
                        }
                    } else {
                        echo 'Aucun format';
                    }
                    ?></li>
                <li class="single-photo__infos">Type : <?php echo esc_html($type); ?></li>
                <li class="single-photo__infos">Année : <?php echo esc_html($year_published); ?></li>
            </ul>  
        </div>

        <div class="single-photo__col2">
            <img class="single-photo__img" src="<?php echo esc_url($thumbnail_url); ?>" alt="<?php echo esc_attr($post_title); ?>" />
        </div>
    </article>

    <article class="single-photo__cta">
        <div class="single-photo__form">
            <p>Cette photo vous intéresse ?</p>
            <button class="button open_modale">Contact</button>
        </div>

        <div class="single-photo__nav">
            <div class="single-photo__miniature">
                <img class="miniature previous-img" src="<?php echo esc_url($previous_post_thumbnail_url); ?>"/>
                <img class="miniature next-img" src="<?php echo esc_url($next_post_thumbnail_url); ?>"/>
            </div>
            <div class="single-photo__fleches">
                <div class="single-photo__taille-fleche1">
                    <a href="<?php echo esc_url($previous_post_link); ?>">    
                        <img class="fleche gauche" src="<?php echo get_stylesheet_directory_uri() . '/assets/grande-fleche-gauche.svg'; ?>"/>
                    </a>
                </div>
                <div class="single-photo__taille-fleche2">
                    <a href="<?php echo esc_url($next_post_link); ?>">  
                        <img class="fleche droite" src="<?php echo get_stylesheet_directory_uri() . '/assets/grande-fleche-droite.svg'; ?>"/>
                    </a>
                </div>
            </div>
        </div>
    </article>

    <article class="single-photo__more">
        <h2 class="single-photo__more-title">Vous aimerez aussi</h2>
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
        <button class="button single-photo__more-button">Toutes les photos</button>
    </article>
</section>

<?php get_footer() ?>