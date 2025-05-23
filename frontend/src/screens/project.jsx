import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const project = () => {

    const location = useLocation()

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

    console.log(location.state)
  return (
    <main className='h-screen w-screen flex'>

        <section className='left relative h-full flex flex-col min-w-72 bg-slate-300'>

            <header className='flex justify-end p-2 px-4 w-full bg-slate-100'>
                <button className='p-2'
                onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
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

            <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen?'translate-x-0': '-translate-x-full'} top-0"`}>

                <header className='flex justify-end p-2 px-4 bg-slate-100'> 

                    <button
                    onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className='ri-close-fill'></i>
                    </button>

                </header>

                <div className='users flex flex-col gap-2'>

                    <div className="user">
                        <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600 '>
                            <i className='ri-user-fill'></i>
                        </div>
                    </div>
                </div>

            </div>


        </section>
    </main>
  )
}

export default project
