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
}

add_action('wp_enqueue_scripts', 'enqueue_styles_and_scripts');


// Ajout de la fonctionnalité des menus
add_theme_support('menus');

// Enregistrer les menus
function register_custom_menus() {
    register_nav_menus( array(
        'main_menu' => __( 'Menu principal', 'text_domain' ),
        'footer_menu' => __( 'Menu footer', 'text_domain' ),
    ));
}
  
  add_action('after_setup_theme', 'register_custom_menus');

// Ajout des modèles de page personnalisés
add_theme_support('page-templates');


// Ajax
add_action( 'wp_ajax_load_photos', 'load_photos' );
add_action( 'wp_ajax_nopriv_load_photos', 'load_photos' );

function load_photos() {
    // Vérification de sécurité
    if (
        ! isset( $_REQUEST['nonce'] ) ||
        ! wp_verify_nonce( $_REQUEST['nonce'], 'load_photos' )
    ) {
        wp_send_json_error( "Erreur de vérification de sécurité. Vous n’avez pas l’autorisation d’effectuer cette action.", 403 );
    }

    // Vérification de la présence de 'paged'
    if ( ! isset( $_POST['paged'] ) ) {
        wp_send_json_error( "Erreur: 'paged' est manquant dans les données de la requête.", 400 );
    }

    // Récupération des données du formulaire
    $paged = intval( $_POST['paged'] );

    // Requête des photos avec pagination
    $query = new WP_Query( array(
        'post_type'      => 'photo',
        'posts_per_page' => get_option('posts_per_page'),
        'paged'          => $paged,
    ) );

    // Préparer le HTML des photos
    ob_start();
    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            $post_ids[] = get_the_ID();
        endwhile;

        // Vérifier si des posts ont été trouvés avant d'inclure le template partiel
        if (!empty($post_ids)) {
            // Utilisez get_template_part avec le deuxième paramètre pour passer les IDs des posts
            get_template_part('templates-part/photo_block', null, ['post_ids' => $post_ids]);
        } else {
            echo '<p>Aucun post trouvé.</p>';
        }

        wp_reset_postdata(); // Réinitialiser les données du post
    endif;
    $html = ob_get_clean();

    // Vérifier s'il y a plus de posts à charger
    $no_more_posts = ($query->max_num_pages <= $paged);

    // Envoyer les données au navigateur
    wp_send_json_success( array( 'html' => $html, 'paged' => $paged + 1, 'no_more_posts' => $no_more_posts) );
}

?>