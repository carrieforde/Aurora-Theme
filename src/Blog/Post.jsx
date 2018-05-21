// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Utilities from '../utilities';
import Categories from './Categories';

const utils = new Utilities();

const Post = (props: {
  id: number,
  date: string,
  slug: string,
  title: Object,
  excerpt: Object,
  _embedded: Object
}) => {
  const { id, date, slug, title, excerpt, _embedded } = props;
  let image,
    categories = utils.getPostCategories(_embedded['wp:term']);

  if (_embedded['wp:featuredmedia']) {
    image = (
      <img
        className="post__thumbnail"
        src={_embedded['wp:featuredmedia'][0].source_url}
        alt={_embedded['wp:featuredmedia'][0].alt}
      />
    );
  }

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__meta">
          <span className="meta__date">{utils.formatPostDate(date)}</span>
          {' \u007C '}
          <Categories categories={categories} />
        </div>

        {image}

        <h2 className="post__title">{title.rendered}</h2>
      </header>

      <div className="post__content-wrap">
        <div
          className="post__content"
          dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
        />

        <footer className="post__footer">
          <Link to={slug} className="link--arrow">
            Read More
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default Post;
