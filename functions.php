<?php 

// Ajout style et script + jQuery
function enqueue_styles_and_scripts() {
    // Enqueue le style
    wp_enqueue_style(
        'styles',
        get_template_directory_uri() . '/style.css',
        array(),
        '1.0',
        'all'
    );

    // Enqueue jQuery
    wp_enqueue_script('jquery');

    // Enqueue le script
    wp_enqueue_script(
        'scripts',
        get_template_directory_uri() . '/js/scripts.js',
        array('jquery'), // Dépendance à jQuery
        '1.0',
        true // Charger le script dans le pied de page
    );

    // Passer des données à script.js avec Ajax
    wp_localize_script('scripts', 'ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('filtration'),
    ));
}

add_action('wp_enqueue_scripts', 'enqueue_styles_and_scripts');

// Fonction pour obtenir les arguments personnalisés en fonction du contexte, pour afficher les posts sur la page accueil et single-post
function get_custom_post_args($context) {
    $args = array(); // Définissez vos arguments par défaut ici

    switch ($context) {
        case 'homepage':
            // Personnalisez les arguments pour la page d'accueil
            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => get_option('posts_per_page'),
                'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
            );
            break;
        case 'single':
            // Personnalisez les arguments pour la page de post unique
            $categories = get_the_category();
            $category_slug = !empty($categories) ? $categories[0]->slug : '';
            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => 2,
                'category_name' => $category_slug,
                'post__not_in' => array(get_the_ID()),
                'orderby' => 'rand',
            );
            break;
        // Ajoutez d'autres cas ici selon les besoins
    }

    return $args;
}

// Ajout de la fonctionnalité des menus

function register_custom_menus() {
    // Activer la prise en charge des menus
    add_theme_support('menus');

    // Enregistrer les menus
    register_nav_menus( array(
        'main_menu' => __( 'Menu principal', 'text_domain' ),
        'footer_menu' => __( 'Menu footer', 'text_domain' ),
    ));
}

add_action('after_setup_theme', 'register_custom_menus');

// Ajout des modèles de page personnalisés
function theme_custom_page_templates() {
    add_theme_support('page-templates');
}

add_action('after_setup_theme', 'theme_custom_page_templates');


// Ajax pour la pagination et la filtration
add_action('wp_ajax_filtration', 'filtration');
add_action('wp_ajax_nopriv_filtration', 'filtration');

function filtration() {
    error_log('La fonction filtration est exécutée.');

    if (isset($_POST['action']) && $_POST['action'] == 'filtration') {
        error_log('Action Ajax détectée.');
      
        $category_slug = isset($_POST['category_slug']) ? $_POST['category_slug'] : '';
        error_log('Slug de la catégorie : ' . $category_slug);

        $format = isset($_POST['format']) ? $_POST['format'] : '';
        error_log('Slug du format : ' . $format);

        $tri = isset($_POST['tri']) ? $_POST['tri'] : '';
        error_log('Slug du tri : ' . $tri);

        $page = isset($_POST['page']) ? $_POST['page'] : '1';
        error_log('Numéro de la page : '. $page);

        $args = array(
            'post_type' => 'photo',
            'posts_per_page' => get_option('posts_per_page'),
            'paged' => $page
        );

        if (!empty($category_slug)) {
            $args['tax_query'][] = array(
                'taxonomy' => 'category',
                'field' => 'slug',
                'terms' => $category_slug,
            );
        }

        if (!empty($format)) {
            $args['tax_query'][] = array(
                'taxonomy' => 'format',
                'field' => 'slug',
                'terms' => $format,
            );
        }
    
        if (!empty($tri)) {
            $args['orderby'] = 'date';
            $args['order'] = $tri;
        }

        error_log('Arguments de la requête : ' . json_encode($args));

        $query = new WP_Query($args);

        if ($query->is_error()) {
            error_log('Erreur de la requête : ' . $query->get_error_message());
        }

        error_log('Nombre de publications trouvées : ' . $query->found_posts);

        // Initialise un tableau pour stocker les IDs de publication
        $post_ids = array();

        if ($query->have_posts()) :
            while ($query->have_posts()) : $query->the_post();
                $post_ids[] = get_the_ID();
            endwhile;
        endif;

        // Vérifiez si des ID de publication ont été récupérés
        if (empty($post_ids)) {
            error_log('Aucun ID de publication trouvé.');
        } else {
            error_log('IDs de publication trouvés : ' . json_encode($post_ids));
        }

        $content = '';

        // Vérifier si des posts ont été trouvés avant d'inclure le template partiel
        if (!empty($post_ids)) :
            // Utilisez get_template_part avec le deuxième paramètre pour passer les IDs des posts
            ob_start();
            get_template_part('templates-part/photo_block', null, ['post_ids' => $post_ids]);
            $content = ob_get_clean();
            // Utilisez wp_send_json_success pour renvoyer les données au format JSON avec le statut "success"
        endif;

        // Nombre total de pages
        $total_pages = $query->max_num_pages;

        wp_send_json_success( array( 'html' => $content, 'total_pages' => $total_pages) );
        wp_die();
    }
}
?>