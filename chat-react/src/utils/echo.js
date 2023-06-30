import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

export default new Echo({
  broadcaster: 'pusher',
  key: '66726edea14712fb5585',
  cluster: 'us2',
  forceTLS: true,
})
