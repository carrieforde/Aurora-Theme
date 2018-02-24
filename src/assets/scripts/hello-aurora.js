/**
 * Displays a very simple site header.
 *
 */
const displayHeader = () => {
  const siteTitle = 'Aurora Theme',
    siteDescription = 'A clean, modern React-powered theme',
    page = document.getElementById('page'),
    primary = document.getElementById('primary'),
    siteHeader = document.createElement('header'),
    title = document.createElement('h1'),
    tagline = document.createElement('p');

  title.textContent = siteTitle;
  title.classList.add('site-title');

  tagline.textContent = siteDescription;
  tagline.classList.add('site-description');

  siteHeader.appendChild(title);
  siteHeader.appendChild(tagline);

  page.insertBefore(siteHeader, primary);
};

export default displayHeader;
