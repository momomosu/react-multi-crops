# React Multi Crops

A multiple cropping component for React

[online demo](https://beizhedenglong.github.io/react-multi-crops/)

![kumamon](./examples/imgs/kumamon.gif)


## Installation
```
npm install react-multi-crops --save
```


## Usage

```js
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import MultiCrops from '../src/components/MultiCrops'
import sampleImg from './imgs/kumamon.jpg'

const samples = [
  { x: 178, y: 91, width: 158, height: 132, id: 'SJxb6YpuG', },
  { x: 436, y: 97, width: 170, height: 168, id: 'SJMZ6YTdf', },
];
const cropColors = ["#ff9999", "#99ff99", "#9999ff", "#ffff55", "#ff55ff"];

const App = () => {
  const [crops, setCrops] = useState(samples);
  const [image, setImage] = useState(sampleImg);

  const onChangeImage = (args) => {
    const file = args.target.files[0];
    setImage(URL.createObjectURL(file));
    console.log(file);
    console.log(args);
  }
  const changeCoordinate = (coordinate, index, _crops) => {
    setCrops(_crops);
  }
  const deleteCoordinate = (coordinate, index, _crops) => {
    setCrops(_crops);
  }
  return (
      <div>
        <h1>Dragging, Drawing, Resizing rectangles on the img</h1>

        <input type="file" onChange={onChangeImage} />
        {image &&
            <div>
              <img src={image} alt="Preview" />
            </div>
        }
        <MultiCrops
            src={image}
            coordinates={crops}
            // onDrag={this.changeCoordinate}
            // onResize={this.changeCoordinate}
            // onDraw={this.changeCoordinate}
            onChange={changeCoordinate}
            onDelete={deleteCoordinate}
            colors={cropColors}
            // onLoad={e => console.log(e.target.height, e.target.width)}
        />
      </div>
  )
}


ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById('root'),
)


```

## Props

| Prop        | Description                                                                                        | Type                                     | Default |
|-------------|----------------------------------------------------------------------------------------------------|------------------------------------------|---------|
| src         | Src of background image.                                                                           | string                                   | -       |
| coordinates | An array of coordinate( see the table blew), {id, x, y, width, height}.                            | array                                    | []      |
| width       | Width of background image.                                                                         | number(in pixel)                         | -       |
| height      | Height of background image.                                                                        | number(in pixel)                         | -       |
| onDraw      | A callback which hanppends when a user starts drawing a new rectangle.                             | funtion(coordinate , index, coordinates) | -       |
| onDrag      | A callback which hanppends when  a user stars draging a exited rectangle.                          | funtion(coordinate , index, coordinates) | -       |
| onResize    | A callback which hanppends when a user starts resizing a exited rectangle.                         | funtion(coordinate , index, coordinates) | -       |
| onChange    | A callback which hanppends when a user starts drawing, draging or resizing a new/exited rectangle. | funtion(coordinate , index, coordinates) | -       |
| onDelete    | A callback which hanppends when a user delete a exited rectangle.                                  | funtion(coordinate , index, coordinates) | -       |
| onLoad      | The callback is  triggered when the background image is loaded.                                    | onLoad(e)                                | -       |
| colors      | array of crop colors                                                                               | array(string)                            |         |



### coordinate

| Prop   | Description                                                  | Type             | Default |
| ------ | ------------------------------------------------------------ | ---------------- | ------- |
| id     | Unique between in coordinates array                          | string           | -       |
| x      | X coordinate  relative to left corner(0,0) of background image. From left to right, x will go up. | number(in pixel) | -       |
| y      | Y coordinate  relative to left corner(0,0) of background image. From top to bottom, y will go up. | number(in pixel) | -       |
| width  | Width of coordinate                                          | number(in pixel) | -       |
| height | Height of coordinate                                         | number(in pixel) | -       |
|color| color of crop|string||

