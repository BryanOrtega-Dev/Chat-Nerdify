import {forwardRef} from 'react'
import {Form, useParams} from 'react-router-dom'

const MessageForm = forwardRef(function MessageForm(props, ref) {
  const params = useParams()

  const handleInputFocus = () => {
    if (props.onInputFocus) {
      props.onInputFocus();
    }
  };

  return (
    <Form
      action={`/channels/${params.roomId}`}
      className="mt-4 rounded-md bg-gray-100 p-2"
      method="post"
      ref={ref}
    >
      <input
        onClick={handleInputFocus}
        autoFocus
        className="block w-full bg-transparent px-4 py-2"
        name="message"
        placeholder="Message..."
        type="text"
      />
    </Form>
  )
})

export default MessageForm
