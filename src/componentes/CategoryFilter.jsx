import React from 'react';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-4 text-center">
      <h5 className="mb-3 text-muted">Filtrar por categoría:</h5>
      <div className="d-flex flex-wrap justify-content-center gap-2">

        <button
          className={`btn ${selectedCategory === 'Todas' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => onSelectCategory('Todas')}
        >
          Todas
        </button>

      
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;