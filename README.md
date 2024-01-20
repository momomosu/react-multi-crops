# React Multi Crops

A multiple cropping component for React

forked from https://beizhedenglong.github.io/react-multi-crops/ 　

[(online demo)](./examples/index.html)


![img.png](examples/imgs/preview.png)

## Installation
```
npm install react-multi-crops@github:momomosu/react-multi-crops
yarn add react-multi-crops@github:momomosu/react-multi-crops
```


## Usage

```js
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import sampleImg from './imgs/kumamon.jpg'
import {MultiCrops} from '../src/components/MultiCrops'

const samples = [
  { x: 178, y: 91, width: 158, height: 132, id: 'SJxb6YpuG', color: "#ffff55", className: "test1"},
  { x: 436, y: 97, width: 170, height: 168, id: 'SJMZ6YTdf', color: "#ff55ff"},
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
  const changeCoordinate = (crop, index, _crops) => {
    console.log("changeCoordinate", _crops);
    setCrops([..._crops]);
  }
  return (
      <div>
        <h1>Drag and resize rectangles on the img</h1>

        <div>
          <input type="file" onChange={onChangeImage} />
        </div>
        <MultiCrops
            src={image}
            crops={crops}
            colors={cropColors}
            onChange={changeCoordinate}
        />
      </div>
  )
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('root'),
)


```

## Props

| Prop     | Description                                                                               | Type                          | Default                                                 |
|----------|-------------------------------------------------------------------------------------------|-------------------------------|---------------------------------------------------------|
| src      | Src of background image.                                                                  | string                        | -                                                       |
| crops    | An array of crop data( see the table below), {id, x, y, width, height, color, className}. | array                         | []                                                      |
| width    | Width of background image.                                                                | number(in pixel)              | -                                                       |
| height   | Height of background image.                                                               | number(in pixel)              | -                                                       |
| onChange | called on (resize, move, select, delete) crop.                                            | function(crop , index, crops) | -                                                       |
| colors   | array of crop colors                                                                      | array(string)                 | ["#ff9999", "#99ff99", "#9999ff", "#ffff55", "#ff55ff"] |



### crops

| Prop      | Description                                                                                       | Type             | Default |
|-----------|---------------------------------------------------------------------------------------------------|------------------|---------|
| id        | Unique in crops array                                                                             | string           | -       |
| x         | X coordinate  relative to left corner(0,0) of background image. From left to right, x will go up. | number(in pixel) | -       |
| y         | Y coordinate  relative to left corner(0,0) of background image. From top to bottom, y will go up. | number(in pixel) | -       |
| width     | Rect width                                                                                        | number(in pixel) | -       |
| height    | Rect height                                                                                       | number(in pixel) | -       |
| color     | Color of rect                                                                                     | string           |         |
| className | class name of rect                                                                                |                  |         |
