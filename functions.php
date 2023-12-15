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

?>