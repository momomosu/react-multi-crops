import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import interact from 'interactjs'
import { DeleteIcon, NumberIcon } from './Icons'

export class Crop extends Component {
  dxSum = 0;
  dySum = 0;

  cropStyle = (zoom) => {
    const { x, y, width, height } = this.props.crop

    return {
      display: 'inline-block',
      position: 'absolute',
      width: width * zoom,
      height: height * zoom,
      top: y * zoom,
      left: x * zoom,

      background: this.props.color || '#8c8c8c',
    }
  }

  componentDidMount() {
    interact(this.cropRef)
      .draggable({})
      .resizable({
        edges: {
          left: true, right: true, bottom: true, top: true,
        },
      })
      .on('click', this.handleClick)
      .on('dragmove', this.handleDragMove)
      .on('resizemove', this.handleResizeMove)
  }
  shouldComponentUpdate(nextProps) {
    return !equals(nextProps, this.props)
  }

  handleClick = () => {
    const { crop, onClick } = this.props
    onClick?.(crop)
  }
  handleResizeMove = (e) => {
    const {
      crop,
      crop: { x, y, width, height },
      onChange,
      zoom
    } = this.props
    const r = x + width;
    const b = y + height;
    const newW = e.rect.width / zoom;
    const newH = e.rect.height / zoom;
    const newX = e.edges.left ? r - newW : x;
    const newY = e.edges.top ? b - newH : y;

    onChange?.({...crop, x: newX, y: newY, width: newW, height: newH,})
  }
  handleDragMove = (e) => {
    const {
      crop,
      crop: { x, y },
      onChange,
      zoom
    } = this.props
    const { dx, dy } = e
    // may called multi times between render.
    this.dxSum += dx / zoom;
    this.dySum += dy / zoom;

    onChange?.({...crop, x: x + this.dxSum, y: y + this.dySum})
  }

  handleDelete = () => {
    const { crop, deleteCrop } = this.props
    deleteCrop?.(crop)
  }

  componentWillUnmount() {
    interact(this.cropRef).unset()
  }

  render() {
    this.dxSum = 0;
    this.dySum = 0;

    const { index, className } = this.props
    return (
      <div style={this.cropStyle(this.props.zoom)} className={`crop ${className}`} ref={ref => this.cropRef = ref}>
        <style jsx>{`
          .crop {
            z-index: 1;
            opacity: 0.4;
          }
          .crop.active{
            z-index: 10;
            opacity: 0.7;
          }
        `}
        </style>
        <NumberIcon number={index + 1} />
        <DeleteIcon onClick={this.handleDelete} />
      </div>
    )
  }
}

export const cropType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

Crop.propTypes = {
  crop: cropType.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  zoom: PropTypes.number,
  deleteCrop: PropTypes.func, // eslint-disable-line
  onChange: PropTypes.func, // eslint-disable-line
  onClick: PropTypes.func, // eslint-disable-line
}
Crop.defaultProps = {
  className: "",
  color: "#fff",
  zoom: 1,
}
