import React, { useEffect } from 'react'
import Fondo from '../../assets/fondoAgave.jpg'
import { Icons } from '../../constants/Icons';
import InputLogin from '../../components/inputs/inputLogin';
import '../../index.css';
import LogoCult from '../../assets/cultivaliaLogo.png';
import useSession from '../../Server/Session/SessionProvider';
import { useFormik } from 'formik'
import * as Yup from 'yup';

 const Login=()=>{
   // const { notify } = useApp()
    const { login} = useSession()

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object().shape({
          email: Yup.string().email('Correo incorrecto').required('Requerido'),
          password: Yup.string().required('Requerido')
        }),
        onSubmit: async (values) => {
          try {
            login(values);
          } catch (e) {
            //notify(getErrorMessage(e), true)
          }
        }
    })

    return(
        <>
            <img src={Fondo} className='object-cover size-full max-sm:absolute'/>
            <img src={LogoCult} className='absolute h-14 w-16 left-3 top-3 max-sm:hidden'/>
            <form onSubmit={formik.handleSubmit} className='absolute max-sm:relative bg-[#279E54]/70 sm:right-0 sm:rounded-s-xl sm:h-full w-[30rem] font-[Roboto] px-10 max-sm:px-5 flex flex-col items-center
            justify-center max-sm:size-[90%] max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 overflow-hidden max-sm:rounded-2xl'>
                <p className='max-sm:text-[3rem] text-[3.5rem] font-bold pt-5 pb-3 '>BIENVENIDO</p>
                <Icons.User className='size-40 text-white'/>
                <div className='w-full flex flex-col gap-10 pt-10'>
                    <InputLogin id="email" password={false} message={"Ingresa tu usuario"} Icon={Icons.User2} formik={formik}/>
                    <InputLogin id="password" password={true} message={"Ingresa tu contraseña"} Icon={Icons.Password} formik={formik}/>
                    <button type='submit' className='w-full bg-[#FFD34B] py-2 rounded-2xl text-2xl font-bold'>Iniciar Sesión</button>
                    <p className='text-2xl font-bold text-white text-center my-auto'>Sitio de administración<br/>Cultivalia </p>
                </div>
            </form>
        </>
    );
}

export default Login