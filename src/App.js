import React from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

const particlesParams =  {
 particles: {
   number: {
     value: 170,
     density: {
       enable: true,
       value_area:  700
     }
   }
}
}
const app = new Clarifai.App({
  apiKey: 'ecee88708b03449e9d7664f7987c6f2c'
});
class App extends React.Component {
constructor(){
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }
}
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col *width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onBtnSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
        this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

render(){
  const { route, isSignedIn, box, imageUrl } = this.state;
    return (
    <div className="App">
      <Particles 
        className='particles'
        params={particlesParams} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

      {route === 'home' ?
      <>
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange}
        onBtnSubmit={this.onBtnSubmit}
        />
      <FaceRecognition imageUrl={imageUrl} box={box}/>
      </>
      : (
        route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange}/>
        : 
        <Register onRouteChange={this.onRouteChange}/>
      )
      }
    </div>
  );
}
  
}

export default App;
