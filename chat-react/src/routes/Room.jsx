import {useEffect, useRef, useState} from 'react'
import {useLoaderData, useRevalidator} from 'react-router-dom'

import MessageForm from '../components/MessageForm'
import MessageList from '../components/MessageList'
import echo from '../utils/echo'
import ky from '../utils/ky'

export async function action({params, request}) {
  const formData = await request.formData()

  await ky
    .post('messages', {
      json: {
        message: formData.get('message'),
        room_id: params.roomId,
      },
    })
    .json()

  return {}
}

export async function loader({params}) {
  const messages = await ky.get(`messages/${params.roomId}`).json()

  return {
    messages,
  }
}



export default function Room() {
  const formRef = useRef(null)
  const listRef = useRef(null)
  const containerRef = useRef(null);
  const {messages} = useLoaderData()
  const revalidator = useRevalidator()
  const [readCount, setReadCount] = useState(0);
  const [newMessages, setNewMessages] = useState(false);

  useEffect(() => {
    const listener = echo
      .channel('messages')
      .listen('MessageCreated', () => {
        revalidator.revalidate();
        setNewMessages(true);
      })

    formRef.current.reset()
    listRef.current.scrollTo(0, listRef.current.scrollHeight)

    return () => listener.stopListening('MessageCreated')
  }, [revalidator])

  const handleInput = () => {
    setReadCount(0);
    setNewMessages(false);
  };
  

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      <MessageList messages={messages} ref={listRef} />
      {newMessages && <div className='p-2 bg-blue-500 text-white rounded-full w-max font-bold m-auto' ref={containerRef} >Tiene un nuevo Mensaje</div>}
      <MessageForm ref={formRef} onInputFocus={handleInput} />
    </div>
  )
}
