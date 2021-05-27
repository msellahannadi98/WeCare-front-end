import React,{useState} from 'react'
import * as _ from 'lodash'
import './SignUp.css';

let initFormValue={
    firstName:'',
    lastName:'',
    email:'',
    dob: ''     
}
let initError={
    firstNameErrors:{},
    lastNameErrors:{},
    emailErrors:{},
    dobErrors:{}
}

const SignUp = (props) => {
    const [formValue,setFormValue]=useState({...initFormValue});
    const [errors,setErrors]=useState({...initError});


    const onSubmit=(e)=>{
        console.log("onsubmit");   
        e.preventDefault();
        const isValid=validation();        
        
        if(isValid){
           console.log("pass");           
           
        }
        else{
           console.log("fail");      
                    
            
        }
        
    }
    const validation=()=>{             
        let localErrors=_.cloneDeep(errors); //make a seperate local errors object and assign it to localErrors 
        if(formValue.firstName.trim().length<1){               
            let firstNameMissing=Object.assign({},{missing:'first name is missing'}); //make a local object 'firstNameMissing' and add the error 
            localErrors.firstNameErrors=firstNameMissing;  //push the error to localErrors   
        }
        else{
            localErrors.firstNameErrors.missing=null;
        }
        if(formValue.firstName.trim().length>10){
            let firstNameTooLong=Object.assign({},{tooLong:'first name is too long'})
            localErrors.firstNameErrors=firstNameTooLong;
                     
        }
        else{
            localErrors.firstNameErrors.tooLong=null;
        }
        if(formValue.lastName.trim().length<1){
            let lastNameMissing=Object.assign({},{missing:'last name is missing'});
            localErrors.lastNameErrors=lastNameMissing;
            
        }
        else{
            localErrors.lastNameErrors.missing=null;
        }
        if(formValue.lastName.trim().length>10){
            let lastNameTooLong=Object.assign({},{tooLong:'last name is too Long'});
            localErrors.lastNameErrors=lastNameTooLong;
            
        }
        else{
            localErrors.lastNameErrors.tooLong=null;
        }
        if(formValue.email.trim().length<1){
            let emailMissing=Object.assign({},{missing:'email is missing'});
            localErrors.emailErrors=emailMissing;            
        }
        else{
            if(!formValue.email.includes('@')){
                let invalidEmail=Object.assign({},{invalidEmail:'invalid email'});
                localErrors.emailErrors=invalidEmail; 
            }
            else{
                localErrors.emailErrors.invalidEmail=null;
            }
            localErrors.emailErrors.missing=null;

        }

        if(_.isEmpty(localErrors.firstNameErrors) && _.isEmpty(localErrors.lastNameErrors) && _.isEmpty(localErrors.emailErrors) && _.isEmpty(localErrors.dobErrors)){
             return true;
        }
        else{
            setErrors({...localErrors}); //push all errors to errors object
            console.log("errors",errors.lastNameErrors);
            return false;
        }
    }

    const onMyChange=(v)=>{
        let value=v.target.value;
        let name=v.target.name;
        setFormValue({...formValue,[name]:value})

    }

    const cancel=()=>{
        props.history.push('./')

    }
    return (<div className="signup">     
                        <div className="container mt-5">     
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Sign Up</h3>
                            <p className="text-center">Please fill in this from to create an acount</p><hr></hr>
                            <div className="card-body">
                            <form onSubmit={onSubmit} >
                                 <div className="form-group">
                                    <label>First Name:</label>
                                    <input placeholder="First Name"                                            
                                           name="firstName" 
                                           className="form-control"
                                           value={formValue.firstName}
                                        //    onBlur={onMyBlur}
                                           onChange={onMyChange}>
                                    </input>
                                    {Object.keys(errors.firstNameErrors).map((key,index)=>{
                                        return <div key={index} style={{color:"red"}}>{errors.firstNameErrors[key]}</div>
                                    })}
                                 </div>
                                 <div className="form-group">
                                    <label>Last Name:</label>
                                    <input placeholder="Last Name" 
                                           name="lastName" 
                                           className="form-control"
                                           value={formValue.lastName}
                                        //    onBlur={onMyBlur}
                                           onChange={onMyChange}>
                                    </input>
                                    {Object.keys(errors.lastNameErrors).map((key,index)=>{
                                        return <div key={index} style={{color:"red"}}>{errors.lastNameErrors[key]}</div>
                                    })}
                                 </div>
                                 <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="Email" 
                                           name="email" 
                                           className="form-control"
                                           value={formValue.email}
                                        //    onBlur={onMyBlur}
                                           onChange={onMyChange}>
                                    </input>
                                    {Object.keys(errors.emailErrors).map((key,index)=>{
                                        return <div key={index} style={{color:"red"}}>{errors.emailErrors[key]}</div>
                                    })}
                                 </div>
                                 <div className="form-group mb-2">
                                    <label>Date of Birth:</label>
                                    <input placeholder="Date of Birth" 
                                           name="dob" 
                                           className="form-control"
                                           value={formValue.dob}
                                        //    onBlur={onMyBlur}
                                           onChange={onMyChange}>
                                    </input>
                                 </div>

                                 <button type="submit" className="btn btn-success"  >Save</button>
                                 <button className="btn btn-danger" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                            </div>
                        </div>
                        </div>
                 </div>

        )
    
}
export default SignUp;