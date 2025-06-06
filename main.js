import './style.scss'
import App from './src/App'
import Loader from './src/gltf/Loader'
import Panel from './src/gui/Panel'

// 3D scene initialization
const app = new App()
//app.init()

// GLTF Loader
const modelPath = 'gltf/medieval_fantasy_book/scene.gltf'
const loader = new Loader(app, modelPath)

