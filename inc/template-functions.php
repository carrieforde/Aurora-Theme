<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package aurora-theme
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @since 1.0.0
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function aurora_theme_body_classes( $classes ) {

	// Theme options.
	$options = get_option( 'aurora_theme_options' );

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Site layout classes.
	if ( isset( $options['site_layout'] ) && $options['site_layout'] ) {
		$classes[] = esc_attr( $options['site_layout'] );
	}

	// Sidebar classes.
	if ( isset( $options['site_sidebar'] ) && $options['site_sidebar'] ) {
		$classes[] = esc_attr( $options['site_sidebar'] ) . '-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'aurora_theme_body_classes' );
/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function aurora_theme_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'aurora_theme_pingback_header' );
