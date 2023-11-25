import React from 'react';
import { Modal } from "antd";import CategoryForm from '../components/Forms/CategoryForm';
;

const DisplayCategories = (props) => {
  const { category, showModal, handleCancel, isModalOpen, newName, setNewName, handleEdit, handleDelete } = props;

  return (
    <table className="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        category?.map((cat) => (
          <tr>
          <td key={cat?._id}>{cat?.name}</td>
          <td>
            <button className="btn btn-primary" onClick={showModal}>Edit</button>
            <Modal onCancel={handleCancel} footer={null} open={isModalOpen}>
            <CategoryForm value={newName} setValue={setNewName} handleSubmit={(e) => handleEdit(e, cat)} />
            </Modal>
            <button className="btn btn-danger ms-3" onClick={(e) => handleDelete(e, cat)}>Delete</button>
          </td>
          </tr>
        ))
      }

    </tbody>
  </table>
  )
}

export default DisplayCategories
