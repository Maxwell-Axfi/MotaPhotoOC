<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>

<body>
    <header class="navbar">
        <img class="navbar__logo" src="<?php echo get_stylesheet_directory_uri() . '/assets/logo.svg'; ?>" alt="Nathalie Mota" />
        <nav class="navbar__menu">
            <ul class="navbar__list">
                <li class="navbar__items">Accueil</li>
                <li class="navbar__items">À propos</li>
                <li class="navbar__items">Contact</li>
            </ul> 
        </nav>

    <div class="container">