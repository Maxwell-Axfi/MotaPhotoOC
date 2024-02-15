</main>
    <footer class="footer">
        <?php wp_nav_menu( array(
                'theme_location' => 'footer_menu',
                'menu_class' => 'footer__menu',
        ));?>
    </footer>

    <?php get_template_part('templates-part/modale'); ?>
    <?php get_template_part('templates-part/lightbox'); ?>
    <?php wp_footer() ?>
</body>
</html>