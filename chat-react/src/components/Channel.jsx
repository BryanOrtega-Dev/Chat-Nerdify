import { Link } from "react-router-dom"

export default function Channel({channel}) {
    return (
        <div>
           <Link className="" to={`/channels/${channel.id}`}>{channel.name}</Link> 
        </div>
    )
}