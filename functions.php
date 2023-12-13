<?php function enqueue_styles() {
    wp_enqueue_style(
        'styles', 
        get_template_directory_uri() . '/style.css', 
        array(),
        '1.0',
        'all');
}

add_action('wp_enqueue_scripts', 'enqueue_styles');
?>