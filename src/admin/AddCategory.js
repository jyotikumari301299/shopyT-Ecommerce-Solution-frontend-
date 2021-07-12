import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';




const AddCategory = ()=>{

const [name, setName] = useState("");
const [error, setError] = useState(false);
 const [success, setSuccess] = useState(false);

 const {user, token} = isAuthenticated();


const goBack = ()=>{
    return (
        <div className="mt-5">
            <Link className="btn btn-sm btn-danger rounded mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    );
}

const handleChange = event =>{
    // first emptyout the error may be it contains error of the last form
    setError("");
    setName(event.target.value);
};

const onSubmit = (event)=>{
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend request fired
    createCategory(user._id, token, {name})
    .then(data =>{
        if(data.error){
            setError(true);
        }else{
            setError("");
            setSuccess(true);
            setName("");
        }
    })
    .catch(err => {console.log("error in getting category from backend", err)});
};

const successMessage = () =>{
    if(success){
        return <h4 className="text-success">Category created Successfully</h4>
    }
}


const warningMessage = ()=>{
    if(error){
        return <h4 className="text-warning">Failed to create category</h4>
    }
}


 const myCategoryForm = () =>{
return (
    <form>
        <div className="form-group">
            <p className="lead">Enter the Category</p>
            <input type="text" className="form-control my-3" onChange={handleChange} value={name} autofocus required placeholder="For Ex. Summer" />
            <button onClick={onSubmit} className="btn btn-outline-info  mb-4">Add Category</button>
        </div>
    </form>
);
 };


    return(
        <Base title="Create a category here"
         description="Add a new category fro new tshirts" 
         className="container bg-info p-4">
         <div className="row bg-white rounded">
             <div className="col-md-8 offset-md-2">
             {successMessage()}
             {warningMessage()}
              {goBack()} 
              {myCategoryForm()}
              </div>
         </div>
        </Base>
    )
}


export default AddCategory;