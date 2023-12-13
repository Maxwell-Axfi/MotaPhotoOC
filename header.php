<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>

<body>
    <header class="navbar">
        <a href="#"><img class="navbar__logo" src="<?php echo get_stylesheet_directory_uri() . '/assets/logo.svg'; ?>" alt="Nathalie Mota" /></a>
        <nav class="navbar__menu">
            <ul class="navbar__list">
                <li class="navbar__items"><a href='#'>Accueil</a></li>
                <li class="navbar__items"><a href='#'>À propos</a></li>
                <li class="navbar__items"><a href='#'>Contact</a></li>
            </ul> 
        </nav>
    </header>

    <div class="container">