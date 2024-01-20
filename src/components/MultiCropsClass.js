import React, {Component} from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { cropType } from './Crop'
import {CropF} from './CropF'


const isValidPoint = (point = {}) => {
  const strictNumber = number => typeof number === 'number' && !Number.isNaN(number);
  return strictNumber(point.x) && strictNumber(point.y)
}

export class MultiCropsClass extends Component {
  drawingIndex = -1
  colorIndex = 0;
  color = ""
  pointStart = {}
  id = shortid.generate()
  _crops = this.props.crops || [];

  getCursorPosition = (e) => {
    const { left, top } = this.containerRef.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  handleMouseDown = (e) => {
    const { crops, colors } = this.props
    if (e.target === this.img || e.target === this.containerRef) {
      const { x, y } = this.getCursorPosition(e)

      this.drawingIndex = crops.length
      this.pointStart = { x, y }
      this.id = shortid.generate()
      this.color = colors[this.colorIndex++]
      if(this.colorIndex >= colors.length) this.colorIndex = 0;
    }
  }


  handleMouseMove = (e) => {
    const { pointStart } = this
    if (isValidPoint(pointStart)) {
      const pointEnd = this.getCursorPosition(e)

      const crop = {
        x: Math.min(pointStart.x, pointEnd.x),
        y: Math.min(pointStart.y, pointEnd.y),
        width: Math.abs(pointStart.x - pointEnd.x),
        height: Math.abs(pointStart.y - pointEnd.y),
        id: this.id,
        color: this.color,
      }
      this.onChangeCrop(crop, true)
    }
  }

  handleMouseUp = () => {
    this.pointStart = {}
  }
  deleteCrop = (crop) => {
    const targetIndex = this._crops.findIndex(c => c.id === crop.id);
    this._crops.splice(targetIndex, 1);
    this._crops.forEach(c => c.className = "");
    this.props.onChange?.(crop, targetIndex, this._crops);
  }

  onChangeCrop = (crop, isNew) => {
    this._crops.forEach(c => c.className = "");
    crop.className = "active";
    const targetIndex = isNew ? this.drawingIndex : this._crops.findIndex(c => c.id === crop.id);
    this._crops[targetIndex] = crop;

    this.props.onChange?.(crop, targetIndex, this._crops);
  }

  render() {
    const {
      src, width, height,
    } = this.props
    return (
      <div
        style={{ display: 'inline-block', position: 'relative',}}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref={ref => this.containerRef = ref}
      >
        <img
          ref={img => this.img = img}
          src={src}
          width={width}
          height={height}
          alt=""
          draggable={false}
        />
        {
          this.props.crops.map((crop, index) => (
            <CropF
              key={crop.id || index}
              index={index}
              crop={crop}
              color={crop.color}
              className={crop.className}
              deleteCrop={this.deleteCrop}
              onChange={this.onChangeCrop}
              onClick={this.onChangeCrop}
            />
          ))
        }
      </div>
    )
  }
}

const {
  string, arrayOf, number, func,
} = PropTypes

MultiCropsClass.propTypes = {
  crops: arrayOf(cropType),
  src: string,
  width: number, // eslint-disable-line
  height: number, // eslint-disable-line
  onChange: func, // eslint-disable-line
  onClick: func, // eslint-disable-line
  onDelete: func, // eslint-disable-line
  colors: arrayOf(string)
}

MultiCropsClass.defaultProps = {
  crops: [],
  src: '',
  colors: ["#ff0000", "#00ff00", "#0000ff"]
}
