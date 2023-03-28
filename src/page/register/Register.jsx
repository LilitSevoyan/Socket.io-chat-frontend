import React from "react";
import { Link,useNavigate } from "react-router-dom";
import {useFormik, Formik,Form,Field} from 'formik'
import * as Yup from 'yup';
import axios from "axios"
export default function Register(){

    const navigate = useNavigate()
    const formik = useFormik ( { 
        initialValues:{
            username:"",
            email:"",
            password:""
        },
        validationSchema:Yup.object({
            username: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('No password provided.') 
                //.matches(
                //    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                //    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
            
          }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            navigate("/login")
            axios.post("http://localhost:8088/register",{
                username:formik.values.username,
                email:formik.values.email,
                password:formik.values.password
            })
            .then(res=> res.data )
		    .catch(err => console.log(err))
            },
    })
    
    return(
        <div className="Main_Content" >
            <div className="Register_Content">
                <div ><Link to ="/"><h3>Home</h3></Link></div>
                <div className="Login_main"> <h1>REGISTER to APP</h1></div>
            </div>
            <div className="log_reg">
                <div className="register"><Link to="/register">Register</Link></div>
                <div className="login"><Link to = "/login">Login</Link></div>
            </div>
            
            <Formik>
                <Form onSubmit={formik.handleSubmit}>
                    <label htmlform="username">Username</label>
                    <Field type="text" name="username" placeholder="UserName"  
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? <div className="errors">{formik.errors.username}</div> : null}

                    <label htmlform="email">Email</label>
                    <Field type ="email" name="email" placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="errors">{formik.errors.email}</div> : null}

                    <label htmlform="password">Password</label>
                    <Field type ="password" name="password" placeholder="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="errors">{formik.errors.password}</div> : null}

                   
                    
                    <button type="submit" >Register</button>
                </Form>
            </Formik>
        </div>
    )
}