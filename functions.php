<?php 

//Ajout style
function enqueue_styles() {
    wp_enqueue_style(
        'styles', 
        get_template_directory_uri() . '/style.css', 
        array(),
        '1.0',
        'all');
}

add_action('wp_enqueue_scripts', 'enqueue_styles');


//Ajout de la fonctionnalité des menus
add_theme_support('menus');

//Enregistrer les menus
function register_custom_menus() {
    register_nav_menus( array(
        'main_menu' => __( 'Menu principal', 'text_domain' ),
        'footer_menu' => __( 'Menu footer', 'text_domain' ),
    ));
}
  
  add_action('after_setup_theme', 'register_custom_menus');
  
?>