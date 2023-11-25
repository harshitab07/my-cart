import React, { useState } from "react";

const CategoryForm = ({ handleSubmit, value, setValue, type }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {type === 'create' ? 'Create Category' : 'Update Category'}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
