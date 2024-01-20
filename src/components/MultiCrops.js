import React, {useRef, useState} from 'react'
import shortid from 'shortid'
import {Crop} from './Crop'


const isValidPoint = (point = {}) => {
  const strictNumber = number => typeof number === 'number' && !Number.isNaN(number);
  return strictNumber(point.x) && strictNumber(point.y)
}

const defaultColors = ["#ff9999", "#99ff99", "#9999ff", "#ffff55", "#ff55ff"];

export const MultiCrops = ({src, width, height, crops, colors=defaultColors, onChange=null}) => {
  const [pointStart, setPointStart] = useState({});
  const [drawingIndex, setDrawingIndex] = useState(-1);
  const [colorIndex, setColorIndex] = useState(0);
  const [color, setColor] = useState("");
  const [id, setId] = useState("");
  const containerRef = useRef();
  const imgRef = useRef();

  const getCursorPosition = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  const handleMouseDown = (e) => {
    if (e.target === imgRef.current || e.target === containerRef.current) {
      const { x, y } = getCursorPosition(e)

      setDrawingIndex(crops.length)
      setPointStart({ x, y })
      setId(shortid.generate());
      setColor(colors[colorIndex])
      setColorIndex(i => i >= colors.length - 1 ? 0 : i+1);
    }
  }


  const handleMouseMove = (e) => {
    if (isValidPoint(pointStart)) {
      const pointEnd = getCursorPosition(e)

      const crop = {
        x: Math.min(pointStart.x, pointEnd.x),
        y: Math.min(pointStart.y, pointEnd.y),
        width: Math.abs(pointStart.x - pointEnd.x),
        height: Math.abs(pointStart.y - pointEnd.y),
        id,
        color,
      }
      onChangeCrop(crop, true)
    }
  }

  const handleMouseUp = () => {
    setPointStart({})
  }
  const deleteCrop = (crop) => {
    const targetIndex = crops.findIndex(c => c.id === crop.id);
    crops.splice(targetIndex, 1);
    crops.forEach(c => c.className = "");
    onChange?.(crop, targetIndex, crops);
  }

  const onChangeCrop = (crop, isNew) => {
    crops.forEach(c => c.className = "");
    crop.className = "active";
    const targetIndex = isNew ? drawingIndex : crops.findIndex(c => c.id === crop.id);
    crops[targetIndex] = crop;

    onChange?.(crop, targetIndex, crops);
  }

    return (
      <div
        style={{ display: 'inline-block', position: 'relative',}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="multiCropsContainer"
        ref={containerRef}
      >
        <img
          ref={imgRef}
          src={src}
          width={width}
          height={height}
          alt=""
          draggable={false}
        />
        {
          crops.map((crop, index) => (
            <Crop
              key={crop.id || index}
              index={index}
              crop={crop}
              color={crop.color}
              className={crop.className}
              deleteCrop={deleteCrop}
              onChange={onChangeCrop}
              onClick={onChangeCrop}
            />
          ))
        }
      </div>
    )
}
