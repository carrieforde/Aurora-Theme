<?php
/**
 * Aurora Theme custom template tags.
 *
 * @package aurora-theme
 */

/**
 * Build and return the site title markup.
 *
 * @since 1.0.0
 */
function aurora_theme_get_site_title() {

	$classes = 'site-title';

	if ( has_custom_logo() ) {
		$classes .= ' screen-reader-text';
	}

	ob_start(); ?>

	<h1 class="<?php echo esc_attr( $classes ); ?>">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
	</h1>

	<?php

	return ob_get_clean();
}

/**
 * Echo the site title markup.
 *
 * @since 1.0.0
 */
function aurora_theme_the_site_title() {

	echo aurora_theme_get_site_title(); // WPCS: XSS OK.
}

/**
 * Build and return markup for the site description.
 *
 * @since 1.0.0
 */
function aurora_theme_get_site_description() {

	$classes = 'site-description';
	$options = get_option( 'aurora_theme_options' );

	if ( isset( $options['hide_tagline'] ) && $options['hide_tagline'] ) {
		$classes .= ' screen-reader-text';
	}

	ob_start();

	?>

	<p class="site-description <?php echo esc_attr( $classes ); ?>"><?php bloginfo( 'description' ); ?></p>

	<?php

	return ob_get_clean();
}

/**
 * Echo the site description markup.
 */
function aurora_theme_the_site_description() {

	echo aurora_theme_get_site_description(); // WPCS: XSS OK.
}

/**
 * Build the footer credits markup.
 *
 * @since 1.0.0
 */
function aurora_theme_get_footer_credits() {

	$options = get_option( 'aurora_theme_options' );

	// Bail early there are no credits.
	if ( ! ( isset( $options['footer_credits'] ) && $options['footer_credits'] ) ) {
		return;
	}

	ob_start();

	?>

	<div class="footer-credits">
		<?php echo wp_kses_post( $options['footer_credits'] ); ?>
	</div>

	<?php

	return ob_get_clean();
}

/**
 * Echo the footer credits markup.
 */
function aurora_theme_the_footer_credits() {

	echo aurora_theme_get_footer_credits(); // WPCS: XSS OK.
}
