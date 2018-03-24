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

	<?php return ob_get_clean();
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

	ob_start(); ?>

	<p class="site-description <?php echo esc_attr( $classes ); ?>"><?php bloginfo( 'description' ) ?></p>

	<?php return ob_get_clean();
}

/**
 * Echo the site description markup.
 */
function aurora_theme_the_site_description() {

	echo aurora_theme_get_site_description(); // WPCS: XSS OK.
}
