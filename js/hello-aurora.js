(function () {

  const siteTitle = 'Aurora Theme',
        siteDescription = 'A clean, modern React-powered theme';

  /**
   * Displays a very simple site header.
   * 
   */
  function displayHeader () {

    const page       = document.getElementById('page'),
          primary    = document.getElementById('primary'),
          siteHeader = document.createElement('header'),
          title      = document.createElement('h1'),
          tagline    = document.createElement('p');

    title.textContent = siteTitle;
    title.classList.add('site-title');

    tagline.textContent = siteDescription;
    tagline.classList.add('site-description');

    siteHeader.appendChild(title);
    siteHeader.appendChild(tagline);

    page.insertBefore(siteHeader, primary);
  }

  // Listen for DOM Content Loaded.
  document.addEventListener('DOMContentLoaded', () => {

    // To stop executing too quickly, wait until a tick.
    setTimeout(() => {
      displayHeader();
    }, 250);
  });
})();
