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

	// Get the theme defaults.
	$option_defaults = aurora_theme_get_option_defaults();

	// Set up core controls to use postMessage.
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	// Hide tagline.
	$wp_customize->add_setting(
		'aurora_theme_options[hide_tagline]',
		array(
			'default'           => $option_defaults['hide_tagline'],
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

	// Display social media links.
	$wp_customize->add_section(
		'aurora_theme_social_links_display',
		array(
			'title'       => __( 'Social Links Display Options', 'aurora-theme' ),
			'description' => __( 'Choose where to show the social links.', 'aurora-theme' ),
			'panel'       => 'nav_menus',
		)
	);
	$wp_customize->add_setting(
		'aurora_theme_options[display_social_links_header]',
		array(
			'default'           => $option_defaults['display_social_links_header'],
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'aurora_theme_validate_checkbox',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_options_display_social_links_header',
		array(
			'type'     => 'checkbox',
			'label'    => __( 'Display social links in the header?', 'aurora-theme' ),
			'section'  => 'aurora_theme_social_links_display',
			'settings' => 'aurora_theme_options[display_social_links_header]',
		)
	);
	$wp_customize->add_setting(
		'aurora_theme_options[display_social_links_footer]',
		array(
			'default'           => $option_defaults['display_social_links_footer'],
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'aurora_theme_validate_checkbox',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_options_display_social_links_footer',
		array(
			'type'     => 'checkbox',
			'label'    => __( 'Display social links in the footer?', 'aurora-theme' ),
			'section'  => 'aurora_theme_social_links_display',
			'settings' => 'aurora_theme_options[display_social_links_footer]',
		)
	);

	// Layout settings.
	$wp_customize->add_section(
		'aurora_theme_layout_section',
		array(
			'title'      => __( 'Layout', 'aurora-theme' ),
			'priority'   => 22,
			'capability' => 'edit_theme_options',
		)
	);

	// Footer section.
	$wp_customize->add_section(
		'aurora_theme_footer_section',
		array(
			'title'      => __( 'Footer', 'aurora-theme' ),
			'priority'   => 140,
			'capability' => 'edit_theme_options',
		)
	);

	// Footer widget areas.
	$wp_customize->add_setting(
		'aurora_theme_options[footer_widget_areas]',
		array(
			'default' => $option_defaults['footer_widget_areas'],
			'type' => 'option',
			'capability' => 'edit_theme_options',
			// 'sanitize_callback' => 'aurora_theme_validate_radio_select',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_footer_widget_areas_control',
		array(
			'type'     => 'select',
			'label'    => __( 'Number of Footer Widget Areas', 'aurora-theme' ),
			'section'  => 'aurora_theme_footer_section',
			'settings' => 'aurora_theme_options[footer_widget_areas]',
			'choices'  => aurora_theme_get_footer_widget_area_options(),
		)
	);

	// Footer credits.
	$wp_customize->add_setting(
		'aurora_theme_options[footer_credits]',
		array(
			'default'           => $option_defaults['footer_credits'],
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'wp_kses_post',
			'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_footer_credits',
		array(
			'type'     => 'textarea',
			'label'    => __( 'Footer Credits', 'aurora-theme' ),
			'section'  => 'aurora_theme_footer_section',
			'settings' => 'aurora_theme_options[footer_credits]',
		)
	);

	// Layout settings.
	$wp_customize->add_setting(
		'aurora_theme_options[site_layout]',
		array(
			'default'           => $option_defaults['site_layout'],
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			// 'sanitize_callback' => 'aurora_theme_validate_radio_select',
			'transport'         => 'postMessage',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_layout_control',
		array(
			'type'     => 'radio',
			'label'    => __( 'Site Layout', 'aurora-theme' ),
			'section'  => 'aurora_theme_layout_section',
			'settings' => 'aurora_theme_options[site_layout]',
			'choices'  => aurora_theme_get_site_layouts(),
		)
	);

	// Sidebar settings.
	$wp_customize->add_setting(
		'aurora_theme_options[site_sidebar]',
		array(
			'default'           => $option_defaults['site_sidebar'],
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			// 'sanitize_callback' => 'aurora_theme_validate_radio_select',
		)
	);
	$wp_customize->add_control(
		'aurora_theme_site_sidebar_control',
		array(
			'type'     => 'radio',
			'label'    => __( 'Site Layout', 'aurora-theme' ),
			'section'  => 'aurora_theme_layout_section',
			'settings' => 'aurora_theme_options[site_sidebar]',
			'choices'  => aurora_theme_get_sidebar_options(),
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
		AURORA_THEME_URL . '/src/customizer-bundle.js',
		array( 'customize-preview' ),
		AURORA_THEME_VERSION,
		true
	);
}
