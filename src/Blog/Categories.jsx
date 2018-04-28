import React from 'react';
import { Link } from 'react-router-dom';

const Categories = props => {
  const { categories } = props;

  return (
    <p className="post-categories">
      {categories.map((category, index, arr) => {
        let sep = index < arr.length - 1 ? ', ' : '';
        return (
          <span key={category.id}>
            <Link to={category.slug}>{category.name}</Link>
            {sep}
          </span>
        );
      })}
    </p>
  );
};

export default Categories;
