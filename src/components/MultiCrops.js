import React, { Component } from 'react'
import { both, clone, is, complement, equals } from 'ramda'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import Crop, { coordinateType } from './Crop'


const isValidPoint = (point = {}) => {
  const strictNumber = number => both(
    is(Number),
    complement(equals(NaN)),
  )(number)
  return strictNumber(point.x) && strictNumber(point.y)
}


class MultiCrops extends Component {
  drawingIndex = -1
  colorIndex = 0;
  color = ""
  pointA = {}
  id = shortid.generate()

  getCursorPosition = (e) => {
    const { left, top } = this.container.getBoundingClientRect()
    return {
      x: e.clientX - left,
      y: e.clientY - top,
    }
  }

  handleMouseDown = (e) => {
    const { coordinates, colors } = this.props
    if (e.target === this.img || e.target === this.container) {
      const { x, y } = this.getCursorPosition(e)

      this.drawingIndex = coordinates.length
      this.pointA = { x, y }
      this.id = shortid.generate()
      this.color = colors[this.colorIndex++]
      if(this.colorIndex >= colors.length) this.colorIndex = 0;
    }
  }


  handleMouseMove = (e) => {
    const { onDraw, coordinates } = this.props
    const { pointA } = this
    if (isValidPoint(pointA)) {
      const pointB = this.getCursorPosition(e)

      // get the drawing coordinate
      const coordinate = {
        x: Math.min(pointA.x, pointB.x),
        y: Math.min(pointA.y, pointB.y),
        width: Math.abs(pointA.x - pointB.x),
        height: Math.abs(pointA.y - pointB.y),
        id: this.id,
        color: this.color,
      }
      const nextCoordinates = clone(coordinates)
      nextCoordinates[this.drawingIndex] = coordinate
      onDraw?.(coordinate, this.drawingIndex, nextCoordinates)
      this.onChangeCrop(coordinate, this.drawingIndex, nextCoordinates)
    }
  }

  handlMouseUp = () => {
    this.pointA = {}
  }

  onChangeCrop = (coordinate, index, _crops) => {
    _crops.forEach(c => c.className = "");
    coordinate.className = "active";
    this.props.onChange?.(coordinate, index, _crops);
  }

  onClickCrop = (coordinate, index) => {
    this.props.coordinates.forEach(c => c.className = "");
    coordinate.className = "active";
    this.props.onChange?.(coordinate, index, [...this.props.coordinates]);
  }

  render() {
    const {
      src, width, height, onLoad,
    } = this.props
    return (
      <div
        style={{ display: 'inline-block', position: 'relative',}}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handlMouseUp}
        ref={container => this.container = container}
      >
        <img
          ref={img => this.img = img}
          src={src}
          width={width}
          height={height}
          onLoad={onLoad}
          alt=""
          draggable={false}
        />
        {
          this.props.coordinates.map((coor, index) => (
            <Crop
              key={coor.id || index}
              index={index}
              coordinate={coor}
              color={coor.color}
              className={coor.className}
              {...this.props}
              onChange={this.onChangeCrop}
              onClick={this.onClickCrop}
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

MultiCrops.propTypes = {
  coordinates: arrayOf(coordinateType),
  src: string,
  width: number, // eslint-disable-line
  height: number, // eslint-disable-line
  onDraw: func, // eslint-disable-line
  onChange: func, // eslint-disable-line
  onLoad: func, // eslint-disable-line
  onClick: func, // eslint-disable-line
  colors: arrayOf(string)
}

MultiCrops.defaultProps = {
  coordinates: [],
  src: '',
  colors: ["#ff0000", "#00ff00", "#0000ff"]
}

export default MultiCrops

