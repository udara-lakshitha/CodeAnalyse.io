import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import type { SignUpRequest } from "../types/api"
import { useState } from "react"
import apiClient from "../api/axiosConfig";

const SignupPage = () => {

    // useNavigate hook is used for programatically change pages
    const navigate = useNavigate()

    // useState hook for manage form data
    const [formData, setFormData] = useState<SignUpRequest>({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);

    // below function is called every time user types in input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // below function is called when click on submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await apiClient.post("/auth/signup", formData);
            const { token } = response.data
            console.log("Signup successful, token", token)
            alert("Signup successfull!")
            navigate("/login")
        } catch (err) {
            console.log("Signup failed:", err)
            setError('Signup failed. Please check your details and try again.');
        }
    }

    return (
        <div style = {{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2 style = {{ textAlign: 'center' }}>Sign Up</h2>
            <form onSubmit = { handleSubmit }>
                <Input label = "Name" name = "name" type = "text" value = { formData.name } onChange = { handleChange } required />
                <Input label = "Email" name = "email" type = "email" value = { formData.email } onChange = { handleChange } required />
                <Input label = "Password" name = "password" type = "password" value = {formData.password } onChange = { handleChange } required />
                <Button type = "submit">Sign Up</Button>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
            </form>
        </div>
    )
}

export default SignupPage