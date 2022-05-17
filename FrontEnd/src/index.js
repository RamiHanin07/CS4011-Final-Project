import React from 'react'
import ReactDOM from 'react-dom'
import Reddit from './Reddit'

const AppContainer = () => {
  return (
    <div
        style ={{
          backgroundColor: "lightGray"
        }}>
      <Reddit/>
    </div>
  )
}


ReactDOM.render(<AppContainer />, document.querySelector('#root'))

