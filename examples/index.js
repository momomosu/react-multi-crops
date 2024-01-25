import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import sampleImg from './imgs/sample.jpg'
import {MultiCrops} from '../src/components/MultiCrops'

const samples = [
  { x: 0, y: 0, width: 960, height: 500, id: 'SJxb6YpuG', color: "#ffff55", className: "test1"},
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
    <div style={{width: "1500px", margin: "0 auto"}}>
      <h1>Drag and resize rectangles on the img</h1>

      <div>
        <input type="file" onChange={onChangeImage} />
      </div>
      <MultiCrops
        src={image}
        width={1200}
        height={500}
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
