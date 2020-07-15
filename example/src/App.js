import React, { useState } from 'react'

import { Droste } from 'react-droste'
import 'react-droste/dist/index.css'

// http://html2canvas.hertzen.com/configuration/

const App = () => {
  let config = { useCORS: true, scale: 0.5 }
  const [isFixed, setIsFixed] = useState(false)

  // let config = {}
  return (
    <div id='wrap'>
      <div className='col'>
        <h1>react-droste</h1>
        <p>{lorem}</p>
        <img src='droste.png' alt='droste package' />
        <Kitten {...get_wh()} />
        <div
          onClick={() => setIsFixed(!isFixed)}
          id='droste_example_wrap'
          className={isFixed ? 'is_fixed' : ''}
        >
          <Droste config={config} width={300} height={400} />
        </div>
        <Kitten {...get_wh()} />

        <p>{lorem + lorem + lorem}</p>
        <Kitten {...get_wh()} />

        <p>{lorem + lorem}</p>
        <Kitten {...get_wh()} />

        <p>{lorem + lorem + lorem + lorem + lorem}</p>
      </div>
    </div>
  )
}

function get_wh() {
  let w = Math.round(Math.random() * 300 + 100)
  let h = Math.round(Math.random() * 300 + 100)
  return { w, h }
}

export default App

function Kitten(props) {
  const { w, h } = props

  // console.log(src)
  const [exampleState, setExampleState] = useState(false)
  let is_active_cn = exampleState ? 'active' : ''
  let src = `https://placekitten.com/${w}/${h}`
  return (
    <img
      src={src}
      width={w}
      height={h}
      alt='kitten'
      className={`kitten ${is_active_cn}`}
      onClick={() => setExampleState(!exampleState)}
    />
  )
}

// consectetur adipisicing elit, sed do eiusmod
// tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim

const lorem = `Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum. consectetur adipisicing elit, sed do eiusmod veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate`
