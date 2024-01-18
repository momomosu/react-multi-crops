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
