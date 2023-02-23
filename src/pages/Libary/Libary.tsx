import { useState } from 'react'
import './Libary.css'
import { Planet } from 'phosphor-react'

//Components
import {UserCard} from '../../components/UserCard'

export function Libary() {
  const [ openMenu , setOpenMenu ] = useState(false)
  
  return (
    <section className={openMenu? 'Libary active' : 'Libary'}>
        <div className='menu_libary'>
          <button onClick={() => setOpenMenu(!openMenu)}>
            <Planet size={25} />
          </button>
        </div>
        <UserCard />
    </section>
  )
}
