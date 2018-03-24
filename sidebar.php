<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

$options = get_option( 'aurora_theme_options' );

// Bail if the user doesn't want to display the sidebar.
if ( 'no' === $options['site_sidebar'] ) {
	return;
}

// Bail if there are no widgets in the sidebar.
if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="sidebar widget-area">
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
