import React, {useEffect, useRef} from 'react'
import interact from 'interactjs'
import { DeleteIcon, NumberIcon } from './Icons'

export const CropF = ({crop, color, index, className, onClick, onChange, deleteCrop}) => {
  let dxSum = 0; // eslint-disable-line no-unused-vars
  let dySum = 0; // eslint-disable-line no-unused-vars
  const divRef = useRef();
  const cropRef = useRef(crop);
  const _crop = cropRef.current;

  const cropStyle = () => {
    const {
      x, y, width, height
    } = _crop

    return {
      // border: '1px dotted rgba(153,153,153,1)',
      // background: 'rgba(153,153,153,0.3)',
      display: 'inline-block',
      position: 'absolute',
      width,
      height,
      top: y,
      left: x,

      boxShadow: '0 0 3px #000',
      background: color || '#8c8c8c',
      opacity: 0.6,
    }
  }

  useEffect(() => {
    interact(divRef.current)
      .draggable({})
      .resizable({
        edges: {
          left: true, right: true, bottom: true, top: true,
        },
      })
      .on('click', handleClick)
      .on('dragmove', handleDragMove)
      .on('resizemove', handleResizeMove)

    return ( () => {
        interact(divRef.current).unset()
    });
  }, []);

  const handleClick = () => {
    onClick?.(_crop)
  }
  const handleResizeMove = (e) => {
    const { x, y, width, height } = _crop;
    const r = x + width;
    const b = y + height;
    const { width: newW, height: newH } = e.rect
    const newX = e.edges.left ? r - newW : x;
    const newY = e.edges.top ? b - newH : y;

    onChange?.({..._crop, x: newX, y: newY, width: newW, height: newH,})
  }
  const handleDragMove = (e) => {
    const { x, y } = _crop;
    const { dx, dy } = e
    // may called multi times between render.
    dxSum += dx;
    dySum += dy;

    onChange?.({..._crop, x: x + dx, y: y + dy})
  }

  const handleDelete = () => {
    deleteCrop?.(_crop)
  }

  return (
    <div style={cropStyle()} className={`crop ${className}`} ref={divRef}>
      <NumberIcon number={index + 1} />
      <DeleteIcon onClick={handleDelete} />
    </div>
  )
}
