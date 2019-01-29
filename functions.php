<?php
/**
 * Aurora Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Aurora_Theme
 */

define( 'AURORA_THEME_VERSION', '1.0.0' );
define( 'AURORA_THEME_PATH', trailingslashit( get_template_directory() ) );
define( 'AURORA_THEME_URL', trailingslashit( get_template_directory_uri() ) );

add_action( 'after_setup_theme', 'aurora_theme_setup' );
/**
 * Set up theme defaults and registers support for various theme features.
 */
function aurora_theme_setup() {

	// Load the theme translation files.
	load_theme_textdomain( 'aurora-theme', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress generate the title tags.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// Register a primary and social menu.
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary', 'aurora-theme' ),
			'social'  => esc_html__( 'Social', 'aurora-theme' ),
		)
	);

	// Use HTML5 where possible.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'aurora_theme_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add support for core custom logo.
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

	// Add editor color palette.
	add_theme_support(
		'editor-color-palette',
		array(
			array(
				'name'  => __( 'Royal Blue', 'aurora-theme' ),
				'slug'  => 'primary',
				'color' => '#2f80e8',
			),
			array(
				'name'  => __( 'Fire Bush', 'aurora-theme' ),
				'slug'  => 'accent',
				'color' => '#e8982f',
			),
			array(
				'name'  => __( 'Malachite', 'aurora-theme' ),
				'slug'  => 'success',
				'color' => '#30e83a',
			),
			array(
				'name'  => __( 'Sunflower', 'aurora-theme' ),
				'slug'  => 'warning',
				'color' => '#e8e830',
			),
			array(
				'name'  => __( 'Alizarin Crimson', 'aurora-theme' ),
				'slug'  => 'danger',
				'color' => '#e82f30',
			),
			array(
				'name'  => __( 'Black', 'aurora-theme' ),
				'slug'  => 'black',
				'color' => '#000',
			),
			array(
				'name'  => __( 'Shark', 'aurora-theme' ),
				'slug'  => 'neutral-900',
				'color' => '#27292b',
			),
			array(
				'name'  => __( 'Abbey', 'aurora-theme' ),
				'slug'  => 'neutral-700',
				'color' => '#4e5156',
			),
			array(
				'name'  => __( 'Oslo Gray', 'aurora-theme' ),
				'slug'  => 'neutral',
				'color' => '#868b92',
			),
			array(
				'name'  => __( 'Iron', 'aurora-theme' ),
				'slug'  => 'neutral-300',
				'color' => '#dadbdd',
			),
			array(
				'name'  => __( 'Alabaster', 'aurora-theme' ),
				'slug'  => 'neutral-100',
				'color' => '#fafafa',
			),
			array(
				'name'  => __( 'White', 'aurora-theme' ),
				'slug'  => 'white',
				'color' => '#fff',
			),
		)
	);

	// Disable custom colors from editor palette.
	add_theme_support( 'disable-custom-colors' );

	// Enable editor styles.
	add_theme_support( 'editor-styles' );

	// Enqueue editor styles.
	add_theme_support( 'dist/editor.css' );

	// Enable wide & full alignment for editor blocks.
	add_theme_support( 'align-wide' );

}

add_action( 'after_setup_theme', 'aurora_theme_content_width', 0 );
/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function aurora_theme_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'aurora_theme_content_width', 640 );
}

add_action( 'widgets_init', 'aurora_theme_widgets_init' );
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function aurora_theme_widgets_init() {

	$options = get_option( 'aurora_theme_options' );

	// Register the primary sidebar widget areas.
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'aurora-theme' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'aurora-theme' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	// Maybe register the footer footer widget areas.
	if ( isset( $options['footer_widget_areas'] ) && $options['footer_widget_areas'] ) {

		// WordPress doesn't translate a %d to one, so we'll register it separately.
		if ( 1 === $options['footer_widget_areas'] ) {

			register_sidebar(
				array(
					'name'          => esc_html__( 'Footer', 'aurora-theme' ),
					'id'            => 'footer-widget-area',
					'description'   => __( 'Shows in the site footer.', 'aurora-theme' ),
					'before_widget' => '<section id="%1$s" class="widget %2$s">',
					'after_widget'  => '</section>',
					'before_title'  => '<h2 class="widget-title">',
					'after_title'   => '</h2>',
				)
			);
		} else {

			register_sidebars(
				(int) $options['footer_widget_areas'],
				array(
					/* translators: the number (instance) of the footer widget area */
					'name'          => esc_html__( 'Footer %d', 'aurora-theme' ),
					'id'            => 'footer-widget-area',
					'description'   => __( 'Shows in the site footer.', 'aurora-theme' ),
					'before_widget' => '<section id="%1$s" class="widget %2$s">',
					'after_widget'  => '</section>',
					'before_title'  => '<h2 class="widget-title">',
					'after_title'   => '</h2>',
				)
			);
		}
	}
}

add_action( 'wp_enqueue_scripts', 'aurora_theme_scripts' );
/**
 * Enqueue scripts and styles.
 */
function aurora_theme_scripts() {

	// Main theme CSS.
	wp_enqueue_style(
		'aurora-theme-style',
		AURORA_THEME_URL . 'dist/frontend.css',
		array(),
		AURORA_THEME_VERSION
	);

	// Theme script bundle.
	wp_enqueue_script(
		'aurora-theme-scripts',
		AURORA_THEME_URL . 'dist/frontend-bundle.js',
		array(),
		AURORA_THEME_VERSION,
		true
	);

	// Translatable strings and other data for JS.
	$vars = array(
		'menu_name'       => __( 'Primary Menu', 'aurora-theme' ),
		'menu_mobile_max' => 900,
		'root_url'        => home_url( '/' ),
	);
	$vars = apply_filters( 'aurora_theme_vars', $vars );

	wp_localize_script( 'aurora-theme-scripts', 'auroraThemeVars', $vars );

	// Comment reply script.
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_action( 'enqueue_block_editor_assets', 'aurora_theme_block_assets' );
/**
 * Enqueue block editor assets.
 */
function aurora_theme_block_assets() {

	// Block styles.
	wp_enqueue_style(
		'aurora-editor-style',
		AURORA_THEME_URL . 'dist/editor.css',
		array(),
		AURORA_THEME_VERSION
	);
}

/**
 * Customizer additions.
 */
require AURORA_THEME_PATH . 'inc/customizer.php';

require AURORA_THEME_PATH . 'inc/theme-options.php';

require AURORA_THEME_PATH . 'inc/template-tags.php';

require AURORA_THEME_PATH . 'inc/template-functions.php';
