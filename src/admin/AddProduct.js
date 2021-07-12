import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index';
import Base from '../core/Base';
import {createProduct, getCategories} from './helper/adminapicall';


const AddProduct = ()=>{

    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    });

    // destructuring for easy use
    // const {name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData} = values;
    const {
      name,
      description,
      price,
      stock,
      photo,
      categories,
      category,
      loading,
      error,
      createdProduct,
      getaRedirect,
      formData
    } = values;
    const preload = ()=>{
        getCategories().then(data =>{
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, categories: data, formData: new FormData()});
                console.log(values);
            }
        })
    };
// in useEffect first object is a callback and second is n array 
    useEffect(() =>{
        preload();
    }, [])


    const onSubmit = event=>{
        event.preventDefault(); 
    setValues({...values, error: "", loading: true});
    createProduct(user._id, token, formData)
    .then(data=>{
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                createdProduct: data.name
                // TODO ASSIGNMENT REDIRECT
            })
        }
    })
    };


  // niche wali line line ka syntax kuchh smjh sa nhi aa rha need to check
  const handleChange = name => event =>{
    // yha pr bhayanak error hua tha
    const value = (name === "photo") ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value}) 
};

const successMessage = ()=>{
    return (
        <div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none"}}>
        <h4>{createdProduct} created Successfully</h4>
        </div>
    );
}

// ASSIGNMENT 1
const warningMessage = ()=>{
    
}

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
             {categories && 
             categories.map((cate, index) =>{
                 return (
                     <option key={index} value={cate._id}>{cate.name}</option>
                 );
             })
             }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );


    return(
        <Base 
        title="Add a product here"
        description="Welcome to Product creation section"
        className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-danger mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
            <div className="col-md-8 offset-md-2">
            {successMessage()}
            {createProductForm()}
            </div>
            </div>
        </Base>
    )
}


export default AddProduct;


