import './StatusCard.css'
import { XCircle, RocketLaunch } from 'phosphor-react'

interface ErrorProps {
    message?: string;
    error?: boolean
}

export function StatusCard({message, error}: ErrorProps) {
  return (
    <div className='statusCard'>
      {error? <>
        {message}
        <XCircle size={32} weight='fill'/>
      </> :
      <>
        Carregando...
        <RocketLaunch size={32} weight='fill' />
      </>
      }
    </div>
  )
}