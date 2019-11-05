import React from 'react'

export default function SubletPage({sublet}) {
  return (
    <div style={{marginRight:"50px"}}>

      <div>
      {sublet.floorLevel}
      </div>

      <div>
      {sublet.rooms}
      </div>

      <div>
      {sublet.rommatesLeft}
      </div>

      <div>
       {sublet.cost}
       </div>

      <div>
      {sublet.details}
      </div>

      {sublet.phone}
      {sublet.elevator}
      {sublet.airCon}
      {sublet.balcony}
      {sublet.washMachine}
      {sublet.wifi}
      {sublet.tv}
      
    </div>
  )
}
