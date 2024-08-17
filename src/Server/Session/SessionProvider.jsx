import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from '../../context/AxiosContext';
import { useApp } from '../../context/AppContext';
import { getErrorMessage } from '../../constants/functions';
import { useNavigate } from 'react-router-dom'

const useSession = () => {

  const queryClient = useQueryClient();
  const { notify } = useApp();
  const { myAxios } = useAxios();
  const navigate = useNavigate()

  /** Functions */

  const getSession = async () => {
    const session = JSON.parse(localStorage.getItem('auth'));
    if (!session) throw new Error('No session found')
    return session
  }

  const postLogin = async (values) => {
    const res = await myAxios.post(`auth/login/`, values)
    return res.data
  }

  const postLogout = async () => {
    const refresh_token = queryClient.getQueryData(['session']).tokens.refresh
    if (!refresh_token) {
      throw new Error('Logout error')
    }
    const res = await myAxios.post(`auth/logout/`, {
      refresh: refresh_token
    })
    return res.data
  }


  /** Queries */

  const SessionQuery = useQuery({
    queryKey: ['session'],
    queryFn: getSession
  })

  /** Mutations */

  const LoginMutator = useMutation({
    mutationFn: postLogin,
    onSuccess: (newUser) => {
      localStorage.setItem('auth', JSON.stringify(newUser));
      queryClient.setQueryData(['session'], newUser);
      navigate('/supervisiones');
      notify('¡Bienvenido!')
    },
    onError: (e) => {
      //console.log(getErrorMessage(e))
      notify(getErrorMessage(e), true)
    }
  })

  const LogoutMutator = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      localStorage.removeItem('auth')
      queryClient.setQueryData(['session'], null)
      queryClient.clear()
      notify('¡Nos vemos!')
      navigate('/login') 
    },
    onError: (e) => {
      localStorage.removeItem('auth')
      queryClient.setQueryData(['session'], null)
      queryClient.clear()
      notify(getErrorMessage(e), true)
      navigate('/login') 
    }
  })

  const {
    data: session,
    status: sessionStatus
  } = SessionQuery

  const {
    mutate: login,
    status: loginStatus,
    error: loginError,

  } = LoginMutator

  const {
    mutate: logout
  } = LogoutMutator

  return ({
    session,
    login,
    logout
  })
}

export default useSession