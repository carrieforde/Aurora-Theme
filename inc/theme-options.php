<?php
/**
 * Aurora Theme options.
 *
 * @package aurora-theme
 */

/**
 * Returns an array of the theme's default options.
 *
 * @since 1.0.0
 *
 * @return array The site defaults.
 */
function aurora_theme_get_option_defaults() {

	$defaults = array(
		'site_layout'  => 'boxed-content',
		'site_sidebar' => 'right-sidebar',
		'hide_tagline' => 0,
	);

	return apply_filters( 'aurora_theme_option_defaults', $defaults );
}

/**
 * Returns an array of site layout options.
 *
 * @since 1.0.0
 *
 * @return array The default layout options.
 */
function aurora_theme_get_site_layouts( $context = '' ) {

	$default_layouts = array(
		'boxed'         => __( 'Boxed', 'aurora-theme' ),
		'boxed-content' => __( 'Boxed Content', 'aurora-theme' ),
		'full-width'    => __( 'Full Width', 'aurora-theme' ),
	);

	return apply_filters( 'aurora_theme_site_layouts', $default_layouts, $context );
}

function aurora_theme_get_sidebar_options( $context = '' ) {

	$sidebar_options = array(
		'left'  => __( 'Left Sidebar', 'aurora-theme' ),
		'right' => __( 'Right Sidebar', 'aurora-theme' ),
		'no'    => __( 'No Sidebar', 'aurora-theme' ),
	);

	return apply_filters( 'aurora_theme_sidebar_options', $sidebar_options, $context );
}

/**
 * Sanitize checkbox input.
 *
 * @since 1.0.0
 *
 * @param bool $checked The value to validate.
 *
 * @return bool Whether the box is checked.
 */
function aurora_theme_validate_checkbox( $checked ) {

	return ( ( isset( $checked ) && true === $checked ) ? true : false );
}

/**
 * Sanitize radio input or a select.
 *
 * @since 1.0.0
 *
 * @param string $input The slug to sanitize.
 * @param WP_Customize_Setting $setting The setting instance.
 *
 * @return string Sanitized slug if the choice is valid; otherwise, the default.
 */
function aurora_theme_validate_radio_select( $input, $setting ) {

	// Ensure input is a slug.
	$input = sanitize_key( $input );

	// Get list of choices from the control associated with the setting.
	$choices = $setting->manager->get_control( $setting->id )->choices;
	// If the input is a valid key, return it; otherwise, return the default.
	return ( array_key_exists( $input, $choices ) ? $input : $setting->default );
}

