<?php
/**
 * Aurora Theme Theme Customizer
 *
 * @package Aurora_Theme
 */

add_action( 'customize_register', 'aurora_theme_customize_register' );
/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function aurora_theme_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	// Hide tagline.
	$wp_customize->add_setting(
		'aurora_theme_options[hide_tagline]',
		array(
			'default'           => 0,
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'aurora_theme_validate_checkbox',
			'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_options_hide_tagline',
		array(
			'type'     => 'checkbox',
			'label'    => __( 'Hide the site description?', 'aurora-theme' ),
			'section'  => 'title_tagline',
			'settings' => 'aurora_theme_options[hide_tagline]',
		)
	);

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'aurora_theme_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'aurora_theme_customize_partial_blogdescription',
		) );
	}
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function aurora_theme_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function aurora_theme_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

add_action( 'customize_preview_init', 'aurora_theme_customize_preview_js' );
/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function aurora_theme_customize_preview_js() {

	// Customizer script.
	wp_enqueue_script(
		'aurora-theme-customizer',
		AURORA_THEME_URL . '/src/customizer.js',
		array( 'customize-preview' ),
		AURORA_THEME_VERSION,
		true
	);
}
