import React, { useRef, useEffect } from 'react'

import html2canvas from 'html2canvas'
import rafSchd from 'raf-schd'

// http://html2canvas.hertzen.com/configuration/

export const Droste = (props) => {
  const canvasRef = useRef(null)
  const ttl = props.ttl || 500
  const element = props.element || document.body
  useEffect(() => {
    // Create an scoped async function in the hook
    async function getDocData() {
      const scrollX = props.config.scrollX || window.pageXOffset
      const scrollY = props.config.scrollY || window.pageYOffset
      const removeContainer = false || props.config.removeContainer
      const inner_width = props.config.width || window.innerWidth
      const inner_height = props.config.height || window.innerHeight
      const x = props.config.x || window.pageXOffset
      const y = props.config.y || window.pageYOffset
      const final_config = {
        ...props.config,
        width: inner_width,
        height: inner_height,
        scrollX,
        scrollY,
        removeContainer,
        x,
        y
      }
      // XXX this is probably a better way to do this, by passing the canvasref in the config
      // canvas: canvasRef.current

      const ctx = canvasRef.current.getContext('2d')
      // ctx.clearRect(0, 0, width, height)
      // console.log('go')

      let sourceCanvas = await html2canvas(element, final_config)

      ctx.clearRect(0, 0, inner_width, inner_height)
      ctx.drawImage(sourceCanvas, 0, 0)
    }
    // this returns a function that only runs at max as often as RAF
    // (so it won't happen if the page isn't focussed)
    const throttledGetDocData = rafSchd(getDocData)
    // which we further throttle massively with ttl in ms
    // this returns the interval id, which we use below to cancel it on unmount
    const timeout = setInterval(throttledGetDocData, ttl)
    return () => {
      clearTimeout(timeout)
    }

    getDocData()
  }, [])
  return (
    <div>
      <canvas ref={canvasRef} width={props.width} height={props.height} />
    </div>
  )
}
