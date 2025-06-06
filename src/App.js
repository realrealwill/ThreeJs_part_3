import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class App {
  // 存储实例
  static #instance = undefined

  // 根节点Dom
  #rootDom = undefined
  // 渲染器
  #renderer = undefined
  get renderer() {
    return this.#renderer
  }
  // 场景
  #scene = undefined
  get scene() {
    return this.#scene
  }
  // 相机
  #camera = undefined
  get camera() {
    return this.#camera
  }

  // 控制器
  #control = undefined

  get control() {
    return this.#control
  }

  // 背景颜色
  #backgroundColor = undefined
  get backgroundColor() {
    return this.#backgroundColor
  }
  set backgroundColor(color) {
    this.#sceneSetBackground(color)
  }

  // resize事件
  #resizeHandler = undefined

  //------------------***CREATE---------------------***//
  #createRootDom = () => document.querySelector('#app')
  #createRenderer = () => new THREE.WebGLRenderer({ antialias: true, })
  #createScene = () => new THREE.Scene()
  #createCamera = () => new THREE.PerspectiveCamera(
    75,
    this.#getWindowAspectRatio(),
    0.1,
    1000
  )

  // 创建摄像机控制器
  #createCameraControls = () => new OrbitControls(this.#camera, this.#renderer.domElement)

  #getWindowAspectRatio = () => window.innerWidth / window.innerHeight

  #create = () => {

    //console.log('App Create');
    this.#rootDom = this.#createRootDom()
    this.#renderer = this.#createRenderer()
    this.#scene = this.#createScene()
    this.#camera = this.#createCamera()
    this.#control = this.#createCameraControls()
  }

  //------------------***SETTING---------------------***//

  #rendererSetPixelRatio = () => this.#renderer.setPixelRatio(window.devicePixelRatio)
  #rendererSetSize = () => this.#renderer.setSize(window.innerWidth, window.innerHeight)
  #rendererDomAppend = () => this.#rootDom?.appendChild(this.#renderer.domElement)
  #cameraSetPosition = () => this.#camera.position.z = 100
  #sceneSetBackground = (color) => {
    this.#scene.background = color ? new THREE.Color(color) : new THREE.Color('#000000')
    this.#backgroundColor = this.#scene.background.getStyle()
  }
  get sceneSetBackground() {
    this.#sceneSetBackground
  }

  #controlAddKeyControl = () => {
    this.#control.listenToKeyEvents(window)
    this.#control.keys = {  // 全部反着写因为设置时camera位置调试
      LEFT: 'KeyD', //left arrow
      UP: 'KeyS', // up arrow
      RIGHT: 'KeyA', // right arrow
      BOTTOM: 'KeyW' // down arrow
    }
  }

  #setting = () => {
    //console.log('App Setting');
    this.#rendererSetPixelRatio()  // 设置像素比
    this.#rendererSetSize()  // 设置渲染器大小
    this.#rendererDomAppend()  // 将渲染器添加到根节点Dom中
    this.#cameraSetPosition()  // 设置相机位置
    this.#sceneSetBackground(0x50316e)  // 设置场景背景颜色
    this.#sceneSetBackground(0xdddddd)  // 设置场景背景颜色
    this.#controlAddKeyControl()  // 添加键盘控制
  }

  get setting() {
    return this.#setting
  }

  #rendererResizeUpdate = () => this.#rendererSetSize()
  #cameraResizeUpdate = () => {
    // 更新宽高比 + 更新相机矩阵
    this.#camera.aspect = this.#getWindowAspectRatio()
    this.#camera.updateProjectionMatrix()
  }

  #update = () => {
    //console.log('App Update');
    this.#resizeHandler = () => {
      // 窗口大小改变时更新渲染器和相机的宽高比
      this.#rendererResizeUpdate()
      this.#cameraResizeUpdate()
    }
    window.addEventListener('resize', this.#resizeHandler)
  }

  #animate = () => {
    //console.log('App Animate');
    requestAnimationFrame(this.#animate)
    this.#render()
  }

  #render = () => {
    //console.log('App Render');
    this.#control.update()
    this.#renderer.render(this.#scene, this.#camera)
  }

  #init = () => {
    //console.log('App Init');
    // 创建关键资源
    this.#create()
    // 设置关键信息
    this.#setting()
    // 更新关键事件
    this.#update()
    // 加载动画渲染
    this.#animate()
  }


  // 判断是否单例
  #isSignalInstance = () => {
    if (App.#instance) {
      return false
    }
    App.#instance = this
    return true
  }

  constructor() {
    if (!this.#isSignalInstance()) return App.#instance
    this.#init()
  }

  get create() {
    return this.#create
  }
}