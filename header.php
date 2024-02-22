<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>

<body>
    <header class="navbar">
        <div class="navbar__conteneur">
            <a href="<?php echo home_url(); ?>" class="navbar__logo">
                <img class="navbar__img" src="<?php echo get_stylesheet_directory_uri() . '/assets/logo.svg'; ?>" alt="Nathalie Mota" />
            </a>

            <div class="navbar__burger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>

            <nav class="navbar__menu close">
                <?php wp_nav_menu( array(
                    'theme_location' => 'main_menu',
                    'menu_class' => 'navbar__list',
                ));?>
            </nav>
        </div>
    </header>

    <main class="container">