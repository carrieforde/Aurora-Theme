/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */
(function() {
  // Updates the site title.
  wp.customize('blogname', value => {
    value.bind(
      to => (document.querySelector('.site-title a').textContent = to)
    );
  });

  // Hides / unhides site title if logo exists.
  wp.customize('custom_logo', setting => {
    setting.bind(logo => {
      const siteTitle = document.querySelector('.site-title');

      if (logo) {
        siteTitle.classList.add('screen-reader-text');
      }

      if (!logo && siteTitle.classList.contains('screen-reader-text')) {
        siteTitle.classList.remove('screen-reader-text');
      }
    });
  });

  // Updates the site description.
  wp.customize('blogdescription', value => {
    value.bind(
      to => (document.querySelector('.site-description').textContent = to)
    );
  });

  // Hides / unhides site tagline.
  wp.customize('aurora_theme_options[hide_tagline]', setting => {
    setting.bind(hide => {
      const siteTagline = document.querySelector('.site-description');
      if (hide) {
        siteTagline.classList.add('screen-reader-text');
      }

      if (!hide && siteTagline.classList.contains('screen-reader-text')) {
        siteTagline.classList.remove('screen-reader-text');
      }
    });
  });

  // Update the body class based on selected site layout.
  wp.customize('aurora_theme_options[site_layout]', setting => {
    setting.bind(layout => {
      const body = document.body;

      // First, remove all layout classes.
      body.classList.remove('boxed', 'boxed-content', 'full-width');

      // Then add the selected class.
      body.classList.add(layout);
    });
  });
})();
