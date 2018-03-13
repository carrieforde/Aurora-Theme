import React from 'react';
import { Link } from 'react-router-dom';
import './index';

const PostCard = props => (
  <article className="post-card">
    <header className="post-card__header">
      <h2 className="post-card__title">{props.title.rendered}</h2>
    </header>
    <div
      className="post-card__content"
      dangerouslySetInnerHTML={{ __html: props.excerpt.rendered }}
    />
    <footer className="post-card__footer">
      <Link to={`/${props.slug}`}>Read More</Link>
    </footer>
  </article>
);

export default PostCard;
