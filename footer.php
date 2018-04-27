<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

?>

	</div><!-- #content -->

	<footer id="site-footer" class="site-footer">

		<?php

		$options = get_option( 'aurora_theme_options' );

		if ( isset( $options['footer_widget_areas'] ) && 0 !== (int) $options['footer_widget_areas'] ) :

			$number_of_widget_areas = (int) $options['footer_widget_areas'];

		?>

		<section id="footer-widget-areas" class="footer-widget-areas footer-widget-areas-<?php echo esc_attr( $number_of_widget_areas ); ?> ">

			<?php

			for ( $i = 1; $i <= $number_of_widget_areas; $i++ ) :

				$widget_area_id = 'footer-widget-area-' . $i;

				// The first widget area doesn't get a number, so let's fix that.
				if ( 1 < (int) $options['footer_widget_areas'] && 1 === $i ) :
					$widget_area_id = 'footer-widget-area';
				endif;

				if ( is_active_sidebar( $widget_area_id ) ) :

				?>
					<div id="<?php echo esc_attr( $widget_area_id ); ?>" class="footer-widget-area <?php echo esc_attr( $widget_area_id ); ?>">
						<?php dynamic_sidebar( $widget_area_id ); ?>
					</div>

				<?php

				endif;
			endfor;

			?>
		</section>

		<?php endif; ?>

		<?php aurora_theme_the_footer_credits(); ?>

		<?php do_action( 'aurora_theme_social_links_footer' ); ?>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
