"use client";
import { RegisterForm } from "../../../components/RegisterForm";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { User } from "../../../../lib/objects/user";

export default function RegisterPage() {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser = new User(uname, password, email);
        const userJson = JSON.stringify(newUser.toDB());

        console.log("New user ready to be saved:", userJson);

        try {
            // Send a POST request to the API endpoint
            const response = await fetch('/api/server-auth-register', { method: 'POST', headers: {
                'Content-Type': 'application/json', },
              body: userJson, // Convert the user object to JSON
            });
      
            const data = await response.json(); // Parse the JSON response
            console.log(data);
            
            if (response.ok) {
              setMessage(data.message); // Success message from API
              // Optionally, redirect the user to another page (e.g., login page)
              //////////////////* SEND EMAIL TO USER */////////////////////////
              console.log('User registered successfully');
              router.push(`/verify-email?input=${encodeURIComponent(email)}`);
            } else {
              setMessage(data.message); // Error message from API
              console.error('Error:', data.message);
            }
          } catch (error) {
            console.error('Unexpected error:', error);
            setMessage('An unexpected error occurred. Please try again.');
          }
    }

    return (
    <div>
        <main>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>Sign Up Page</h1>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <RegisterForm       
                uname={uname}
                setUnameAction={setUname}
                email={email}
                setEmailAction={setEmail}
                password={password}
                setPasswordAction={setPassword}
                onSubmitAction={handleSubmit}
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <Link
                    href = "/login" 
                    className = {"mr-4 text-blue-500"}
                    >
                        I have an Account
                </Link>
            </div>
        </main>
    </div>
    );
}