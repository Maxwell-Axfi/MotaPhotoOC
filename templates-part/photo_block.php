<?php
// Récupérer la variable $post_ids du tableau de paramètres
$post_ids = $args['post_ids'];

if (!empty($post_ids)) :
?>
    <div class="photo-block">
        <?php foreach ($post_ids as $post_id) : ?>
            <a  class="photo-block__lien" href="<?php echo esc_url(get_permalink($post_id)); ?>">
                <img class="photo-block__img" src="<?php echo esc_url(get_the_post_thumbnail_url($post_id)); ?>" alt="<?php echo esc_attr(get_the_title($post_id)); ?>" />
            </a>
        <?php endforeach; ?>
    </div>
<?php else : ?>
    <p>Aucun autre post trouvé.</p>
<?php endif; ?>
