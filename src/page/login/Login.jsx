import React,{useEffect} from "react";
import {Link,useNavigate} from "react-router-dom"
import {useFormik, Formik,Form,Field} from 'formik'
import {postLoginAction,getUsersAllAction} from "../../redux/actions/mainAction"

import { useDispatch, useSelector } from 'react-redux'


export default function Login(){
   // const [user,setUser] = useState("")
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.main)
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getUsersAllAction())
        console.log({"users": users})
    },[])
    
    const validate = ((values) => {
        const errors = {};
        
        if (!values.email) {
            errors.email = 'Required';
        } 
        if (!values.password) {
            errors.password = 'Required';
        } 
        return errors;
    })
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate,
        onSubmit: async (values) => {
            console.log(JSON.stringify(values, null, 2));
            //const sinIn = user.filter(elem => elem.email === formik.values.email && elem.password === formik.values.password)
                
                await dispatch(postLoginAction({
                    email:formik.values.email,
                    password:formik.values.password
                }))
                navigate("/")
          
            
        },

    })
    
    
    return(
        <div className="Main_Content">
            <div className="Register_Content">
                <div ><Link to ="/"><h3>Home</h3></Link></div>
                <div className="Login_main"> <h1>LOGIN to APP</h1></div>
            </div>
            <div className="log_reg">
                <div className="register"><Link to="/register">Register</Link></div>
                <div className="login"><Link to = "/login">Login</Link></div>
            </div>
            <Formik>
                <Form onSubmit={formik.handleSubmit}>
                    <label htmlform="email">Email</label>
                    <Field type ="email" name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <label htmform="password">Password</label>
                    <Field type ="password" name="password"
                        value={formik.values.password}
                        onChange ={formik.handleChange}
                        
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    <button type="submit">Login </button>
                </Form>
            </Formik>
        </div> 
      
    )
}