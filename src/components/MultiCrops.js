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
  const [zoom, setZoom] = useState(1);
  const [imageLeft, setImageLeft] = useState(0);
  const [imageTop, setImageTop] = useState(0);

  const onImageLoad = () => {
    const image = imgRef.current;
    if (!image) return;

    // 表示されている画像の左上位置を計算
    const containerWidth = image.clientWidth;
    const containerHeight = image.clientHeight;
    const {naturalWidth, naturalHeight} = image;
    setZoom(image.width / image.naturalWidth);

    const aspectRatio = naturalWidth / naturalHeight;
    let displayedWidth, displayedHeight;

    if (containerWidth / containerHeight > aspectRatio) {
      displayedWidth = containerHeight * aspectRatio;
      setImageLeft((containerWidth - displayedWidth) / 2);
      setImageTop(0);
    } else {
      displayedHeight = containerWidth / aspectRatio;
      setImageLeft(0);
      setImageTop((containerHeight - displayedHeight) / 2);
    }
  }
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
        x: Math.min(pointStart.x, pointEnd.x) / zoom,
        y: Math.min(pointStart.y, pointEnd.y) / zoom,
        width: Math.abs(pointStart.x - pointEnd.x) / zoom,
        height: Math.abs(pointStart.y - pointEnd.y) / zoom,
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
          onLoad={onImageLoad}
          style={{objectFit: "contain"}}
        />
        <div className="cropContainer" style={{left: imageLeft+"px", top: imageTop+"px", position: "absolute"}}>
          {
            crops.map((crop, index) => (
              <Crop
                key={crop.id || index}
                index={index}
                crop={crop}
                color={crop.color}
                className={crop.className}
                zoom={zoom}
                deleteCrop={deleteCrop}
                onChange={onChangeCrop}
                onClick={onChangeCrop}
              />
            ))
          }
        </div>
      </div>
    )
}
