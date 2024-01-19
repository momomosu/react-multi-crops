import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import MultiCrops from '../src/components/MultiCrops'
import sampleImg from './imgs/kumamon.jpg'

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
  const changeCoordinate = (coordinate, index, _crops) => {
    setCrops(_crops);
  }
  const deleteCoordinate = (coordinate, index, _crops) => {
    setCrops(_crops);
  }
  const onClick = (coordinate, index) => {
    console.log("onClick", coordinate);
  }
  return (
    <div>
      <h1>Dragging, Drawing, Resizing rectangles on the img</h1>

      <div>
        <input type="file" onChange={onChangeImage} />
      </div>
      <MultiCrops
        src={image}
        coordinates={crops}
        // onDrag={this.changeCoordinate}
        // onResize={this.changeCoordinate}
        // onDraw={this.changeCoordinate}
        onClick={onClick}
        onChange={changeCoordinate}
        onDelete={deleteCoordinate}
        colors={cropColors}
        // onLoad={e => console.log(e.target.height, e.target.width)}
      />
    </div>
  )
}


ReactDOM.render(
  <App />
  ,
  document.getElementById('root'),
)
