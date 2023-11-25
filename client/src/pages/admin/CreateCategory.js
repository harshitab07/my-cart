import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [ name, setName ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(process.env.REACT_APP_CREATE_CATEGORY, { name });

      if (data.success) {
        setName('');
        getAllCategories();
        toast.success(`${data.category.name} is created!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('Error in create category', { error });
      toast.error('Failed to create new category');
    }
  }

  const handleDelete = async (e, cat) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(process.env.REACT_APP_DELETE_CATEGORY, { data: { name: cat.name } });
      if (data.success) {
        setName('');
        getAllCategories();
        toast.success(`${cat.name} is deleted!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('Error in delete category', { error });
      toast.error('Failed to delete category');
    }
  }

  const handleEdit = async (e, cat) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(process.env.REACT_APP_UPDATE_CATEGORY, { name: newName, id: cat._id });
      if (data.success) {
        setNewName('');
        handleOk();
        getAllCategories();
        toast.success(`${newName} is updated!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log('Error in edit category', { error });
      toast.error('Failed to edit category');
    }
  }

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_GET_ALL_CATEGORIES
      );

      if (data?.success) {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log("Error in getting categories", { error });
      toast.error("Something went wrong in getting category!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title="My-Cart : Users List">
      <ToastContainer />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Manage Category</h3>
              <div className="p-3 w-50">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} type='create' />
              </div>
              <div>
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
                          <CategoryForm value={newName} setValue={setNewName} handleSubmit={(e) => {console.log(cat); handleEdit(e, cat)}} cat={cat} />
                          </Modal>
                          <button className="btn btn-danger ms-3" onClick={(e) => handleDelete(e, cat)}>Delete</button>
                        </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
