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

?>

<section class="single-photo">
    <article class="single-photo__card">
        <div class="single-photo__col1">
            <h2 class="single-photo__title"><?php echo esc_html($post_title); ?></h2>
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

    <article class="single-photo__nav">
        <div class="single-photo__form">
            <p>Cette photo vous intéresse ?</p>
            <button class="button open_modale">Contact</button>
        </div>
    </article>
</section>

<?php get_footer() ?>