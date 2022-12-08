import React, { useState } from 'react'
import { useRef, useCallback } from "react";
import { useTheme } from 'styled-components'
import { CenteredContainer, AuthenticationForm, Button } from "../components/styles/Utilities.styles"
import { createUser } from "../Utils/API"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../Utils/UserContext"
import { useUserReducer } from "../Utils/reducers"
import { REGISTER } from '../Utils/actions';

const Signup = () => {
   const navigate = useNavigate()
   const theme = useTheme();
   const userNameInputElement = useRef();
   const emailInputElement = useRef();
   const passwordInputElement = useRef();
   const passwordConfirmationInputElement = useRef();
   const [confirm, setConfirm] = useState(false);

   const [state, dispatch] = useUserContext();



   const formHandler = async (event) => {
      event.preventDefault();
      const data = await createUser(
         userNameInputElement.current?.value,
         emailInputElement.current?.value,
         passwordInputElement.current?.value
      )
      const { email, id, lists, buckets, username } = data.user
      console.log(data.user)
      dispatch({
         type: REGISTER,
         payload: {
            token: data.token,
            ...data.user
         },
      })
      console.log(state)
      navigate('/dashboard')
   }


   return (
      <CenteredContainer>
         <AuthenticationForm onSubmit={formHandler}>
            <h2>Sign Up</h2>
            <label>
               Username
               <input
                  ref={userNameInputElement}
                  id="full_name"
                  placeholder="Full name"
                  type="text"
                  required
               />
            </label>


            <label>
               Email
               <input
                  ref={emailInputElement}
                  id="email"
                  placeholder="Email"
                  type="email"
                  required
               />

            </label>

            <label >
               Password
               <input
                  ref={passwordInputElement}
                  id="password"
                  placeholder="Password"
                  type="password"
                  required
               />


            </label>
            <label>
               Confirm Password
               {confirm && <small>Passwords do not Match</small>}
               <input
                  ref={passwordConfirmationInputElement}
                  id="password_confirmation"
                  placeholder="Password Confirmation"
                  onChange={() => { setConfirm(passwordInputElement.current?.value !== passwordConfirmationInputElement.current?.value) }}
                  type="password"
                  required
               />
            </label>
            <Button bg={theme.colors.accent} color={theme.colors.cardBackground} type="submit" disabled={passwordInputElement.current?.value !== passwordConfirmationInputElement.current?.value || passwordConfirmationInputElement.current?.value == ''}>
               Submit
            </Button>

         </AuthenticationForm >
      </CenteredContainer >
   )
}

export default Signup