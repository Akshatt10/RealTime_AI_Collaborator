import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket';
import { UserContext } from '../context/user.context';

const Project = () => {
  const location = useLocation()

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setproject] = useState(location.state.project);
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);
  const messageBox = React.useRef(null);


  const handleUserClick = (id) => {
    setSelectedUserIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {

        return prevSelectedIds.filter(userId => userId !== id);
      } else {

        return [...prevSelectedIds, id];
      }
    });
  };

  function addCollaborators() {

    axios.put("/projects/add-user", {
      projectId: location.state.project._id,
      users: Array.from(selectedUserIds)
    }).then(res => {
      console.log(res.data)
      setIsModalOpen(false)

    }).catch(err => {
      console.log(err)
    })

  }

  function send() {

    sendMessage('project-message', {
      message,
      sender: user
    })

    appendOutgoingMessage(message)

    setMessage("");
  }


  useEffect(() => {
    axios.get('/users/all')
      .then(response => {
        setUsers(response.data.allusers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {

    initializeSocket(project._id)

    receiveMessage('project-message', (message) => {
      console.log('Received message:', message);
      appendIncomingMessage(message);
    });

    axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      setproject(res.data.project)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  function appendIncomingMessage(message) {
    const messageBox = document.querySelector('.message-box');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md');
    messageDiv.innerHTML = `
      <small class='opacity-65 text-xs'>${message.sender.email}</small>
      <p class='text-sm'>${message.message}</p>
    `;
    messageBox.appendChild(messageDiv);
    scrolltobottom();

  }

  function appendOutgoingMessage(message) {
    const messageBox = document.querySelector('.message-box');

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'max-w-56', 'flex', 'flex-col', 'p-2', 'bg-slate-50', 'w-fit', 'rounded-md', 'ml-auto');
    messageDiv.innerHTML = `
      <small class='opacity-65 text-xs'>${user.email}</small>
      <p class='text-sm'>${message}</p>
    `;
    messageBox.appendChild(messageDiv);
    scrolltobottom();

  }

  function scrolltobottom(){
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }




  return (
    <main className='h-screen w-screen flex'>
      <section className='left relative h-screen flex flex-col min-w-96 bg-slate-300'>
        {/* Header */}
        <header className='flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute top-0'>
          <button className='flex gap-2' onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-fill mr-1 "></i>
            <p>Add Collaborator</p>
          </button>
          <button className='p-2' onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
            <i className='ri-group-fill'></i>
          </button>
        </header>

        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-y-auto"
      >
          </div>
          <div className="inputField w-full flex absolute bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='p-2 px-4 border-none outline-none flex-grow' />
            <button
              onClick={send}
              className='px-5 bg-slate-950 text-white'>
              <i className='ri-send-plane-fill'></i>
            </button>
          </div>
        </div>

        {/* Side Panel (No changes here) */}
        <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
          <header className='flex justify-between items-center p-2 px-4 bg-slate-100'>
            <h1 className='font-semibold text-lg'>Collaborators</h1>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
              <i className='ri-close-fill'></i>
            </button>
          </header>
          <div className='users flex flex-col gap-2'>
            {project.users && project.users.map(user => {

              return (
                <div className="user flex gap-2 cursor-pointer hover:bg-slate-200 p-2 items-center">
                  <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600 '>
                    <i className='ri-user-fill'></i>
                  </div>
                  <h1 className='font-semibold text-lg'>{user.email}</h1>
                </div>
              )

            })}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className='p-2'>
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map(user => (
                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserIds).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                  <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className='font-semibold text-lg'>{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;