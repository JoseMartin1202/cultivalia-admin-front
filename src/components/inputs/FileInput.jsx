import React from 'react'
import { valueFromId } from '../../constants/functions'
import { Icons } from '../../constants/Icons'

const FileInput = ({ id, readonly,formik, ...props }) => {

   const value = valueFromId(id, formik.values)
   const error = valueFromId(id, formik.errors)
   const touched = valueFromId(id, formik.touched)
   const showError = error && (touched || formik.submitCount > 0);

   return (
      <div className='flex flex-col'>
         <div className='relative p-2 flex flex-col w-full bg-neutral-200/70 text-neutral-800 total-center '>
            {!value ? <>
               <input
                  readOnly={readonly ?? undefined}
                  onChange={(e) => formik.setFieldValue(id, e.target.files[0])}
                  className="absolute z-10 opacity-0 cursor-pointer size-full" id="file" type="file"
                  {...props} />
               <label htmlFor="file" className='flex-col py-2 total-center text-center'>
                  <Icons.Upload className='size-12' />
                  <p className='text-neutral-700'> Click aquí o arrastra un archivo para subir </p>
               </label>
            </> : <>
            {!readonly && 
               <div className='relative flex w-full h-10 py-1 total-center'>
                  <p className='font-medium'>{value.name || "File loaded"}</p>
                  <button
                     type='button'
                     onClick={() => formik.setFieldValue(id, null)}
                     className='absolute hover:bg-slate-300 right-1 size-8 total-center'>
                     <Icons.Clear size="20px" />
                  </button>
               </div>}
            </>
            }
         </div>
         {showError &&
            <div className='h-fit'>
                <p className='font-normal text-lg flex items-center gap-1 h-full italic text-red-500 '>
                    <Icons.Alert size="14px" />
                    {error}
                </p>
            </div>
            }
      </div>
   )
}

export default FileInput