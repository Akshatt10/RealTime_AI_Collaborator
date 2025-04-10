import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const project = () => {

    const location = useLocation()

    console.log(location.state)
  return (
    <main className='h-screen w-screen flex'>

        <section className='left h-full flex flex-col min-w-72 bg-slate-300'>

            <header className='flex justify-end p-2 px-4 w-full bg-slate-100'>
                <button className='p-2'>
                <i className='ri-group-fill'></i> 
                </button>

            </header>

            <div className="conversation-area flex-grow flex flex-col">
                <div className="message-box p-1 flex-grow flex flex-col gap-1">

                    <div className="max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                        <small className='opacity-65 text-xs'>example@gmail.com</small>
                        <p className='text-sm'>hello</p>
                    </div>
                    <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                        <small className='opacity-65 text-xs'>example@gmail.com</small>
                        <p className='text-sm'>hello</p>
                    </div>

                     </div>
                    <div className="inputField w-full flex">
                        <input type="text" placeholder='Enter your message' className='p-2 px-4 border-none outline-none'/>
                        <button className='flex-grow px-3'><i className='ri-send-plane-fill'></i></button>
                    </div>
               
            </div>


        </section>
    </main>
  )
}

export default project
