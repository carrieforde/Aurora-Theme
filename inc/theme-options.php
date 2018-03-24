<?php
/**
 * Aurora Theme options.
 *
 * @package aurora-theme
 */

/**
 * Sanitize checkbox input.
 *
 * @param string $checked The input to validate.
 *
 * @since 1.0.0
 */
function aurora_theme_validate_checkbox( $checked ) {

	return ( ( isset( $checked ) && true === $checked ) ? true : false );
}
