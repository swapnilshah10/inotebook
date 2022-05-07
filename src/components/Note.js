import React from 'react'

function Note(props) {
  return (
    <div>
        {props.data.name}
        <div>{props.data.description}</div>
        <div>{props.data.tags}</div>
    </div>
  )
}

export default Note