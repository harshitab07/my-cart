import { Select } from 'antd';
import { Option } from 'antd/es/mentions';

const CreateProductForm = (props) => {

  const { categories, setCategory, photo, setPhoto, name, setName, description, setDescription, price, setPrice, quantity, setQuantity, shipping, setShipping, handleCreateProduct, type, id, categoryName, handleDeleteProduct } = props;

  return (
  <div className='col-md-9'>
  <div className='card w-75 p-3'>
    <h3 className='text-center mb-2'>{type ? 'Create Product' : 'Update Product'}</h3>
  <div className='m-1 w-75'>
    <Select bordered={false} placeholder={categoryName || 'Select a category'} size='large' showSearch className='form-select mb-3' onChange={(value) => setCategory(value)} >
    {categories?.map((c) => (
      <Option key={c?._id} value={c?._id}>{c?.name}</Option>
    ))}
    </Select>
    <div className='mb-3'>
      <label className='btn btn-outline-secondary col-md-12'>
        {photo ? photo.name : 'Upload Photo'}
        <input type='file' name='' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
      </label>
    </div>
    <div className='mb-3'>
      {
      photo ? (
        <div className='text-center'>
          <img src={URL.createObjectURL(photo)} alt='uploaded-img' height={'200px'} className='img img-responsive' />
        </div>
      ) : (
        id && <div className='text-center'>
        <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${id}`} alt='uploaded-img' height={'200px'} className='img img-responsive' />
      </div>
      )
    
    }
    </div>
    <div className='mb-3'>
        <input type='text' value={name} placeholder='Write a name..' className='form-control' onChange={(e) => setName(e.target.value)} />
    </div>
    <div className='mb-3'>
        <textarea type='text' value={description} placeholder='Write description..' className='form-control' onChange={(e) => setDescription(e.target.value)} />
    </div>
    <div className='mb-3'>
        <input type='text' value={price} placeholder='Enter price..' className='form-control' onChange={(e) => setPrice(e.target.value)} />
    </div>
    <div className='mb-3'>
        <input type='text' value={quantity} placeholder='Enter quantity..' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
    </div>
    <Select bordered={false} placeholder={'Is shipping?'} size='large' className='form-select mb-3' onChange={(value) => setShipping(value)} value={shipping} >
      <Option key='shipping-yes' value='Yes'>Yes</Option>
      <Option key='shipping-no' value='No'>No</Option>
    </Select>
    <div className='mb-3'>
        <button className='btn btn-primary' onClick={handleCreateProduct}>{type ? 'Create Product' : 'Update Product'}</button>
    </div>
    {
      !type && <div className='mb-3'>
      <button className='btn btn-danger' onClick={handleDeleteProduct}>Delete Product</button>
  </div>
    }
  </div>
  </div>
</div>
  );
};

export default CreateProductForm;
