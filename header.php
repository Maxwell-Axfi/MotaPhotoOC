<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>

<body>
    <header class="navbar">
        <a href="#" class="navbar__logo">
            <img class="navbar__img" src="<?php echo get_stylesheet_directory_uri() . '/assets/logo.svg'; ?>" alt="Nathalie Mota" />
        </a>
        <nav class="navbar__menu">
            <?php wp_nav_menu( array(
                'theme_location' => 'main_menu',
                'menu_class' => 'navbar__list',
            ));?>
        </nav>
    </header>

    <div class="container">