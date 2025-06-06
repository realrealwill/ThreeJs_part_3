import { GUI } from 'dat.gui'
import App from '@/App'

export default class Panel {

  #loader = undefined;
  #scene = undefined;
  #camera = undefined;
  #control = undefined;
  #renderer = undefined;
  #app = undefined;
  #model = undefined;
  #gui = new GUI();

  #axesHelper = undefined;
  #gridHelper = undefined;
  #cameraHelper = undefined;
  #box3Helper = undefined;

  showInfo = () => {
    console.log("loader: ", this.#loader);
    console.log("scene: ", this.#scene);
    console.log("camera: ", this.#camera);
    console.log("control: ", this.#control);
    console.log("renderer: ", this.#renderer);
    console.log("app: ", this.#app);
    console.log("model: ", this.#model);
  }

  #panelAdd = () => {
    const cameraFolder = this.#gui.addFolder('CAMERA')
    cameraFolder.open()
    const cameraPositionX = cameraFolder.add(this.#camera.position, 'x').name('camera.position.x').listen()
    const cameraPositionY = cameraFolder.add(this.#camera.position, 'y').name('camera.position.y').listen()
    const cameraPositionZ = cameraFolder.add(this.#camera.position, 'z').name('camera.position.z').listen()

    const controlFolder = this.#gui.addFolder('CONTROL')
    controlFolder.open()
    // 旋转 旋转速度
    this.controlAutoRotateHandler = controlFolder.add(this.#controlBtn, 'autoRotate').listen()
    this.#updateAutoRotateState()

    controlFolder.add(this.#control, 'autoRotateSpeed', -10, 10, 0.1).name('Auto Rotate Speed').listen()

    // reset position
    controlFolder.add(this.#controlBtn, 'resetAll').name('Reset All')

    controlFolder.addColor(this.#app, 'backgroundColor').name('Background Color').listen()
  }


  #controlBtn = {
    autoRotate: () => {
      this.#control.autoRotate = !this.#control.autoRotate  // 翻转
      // 改名
      this.#updateAutoRotateState()
    },

    resetAll: () => {
      this.#control.reset()
      this.#app.setting()  // 重新set设置
      this.#updateAutoRotateState()
    }
  }

  #updateAutoRotateState = () => {
    this.controlAutoRotateHandler.name("AutoRotate: " + this.#control.autoRotate)
  }

  constructor(app = new App(), loader) {
    this.#app = app
    this.#loader = loader
    this.#scene = app.scene
    this.#camera = app.camera
    this.#control = app.control
    this.#renderer = app.renderer
    this.#model = loader.model
    // this.showInfo()
    this.#panelAdd()
  }
}