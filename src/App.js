import * as THREE from 'three'
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
  // 背景颜色
  #backgroundColor = undefined

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
  #getWindowAspectRatio = () => window.innerWidth / window.innerHeight

  #create = () => {

    console.log('App Create');
    this.#rootDom = this.#createRootDom()
    this.#renderer = this.#createRenderer()
    this.#scene = this.#createScene()
    this.#camera = this.#createCamera()
  }

  //------------------***SETTING---------------------***//

  #rendererSetPixelRatio = () => this.#renderer.setPixelRatio(window.devicePixelRatio)
  #rendererSetSize = () => this.#renderer.setSize(window.innerWidth, window.innerHeight)
  #rendererDomAppend = () => this.#rootDom?.appendChild(this.#renderer.domElement)
  #cameraSetPosition = () => this.#camera.position.z = 5
  #sceneSetBackground = (color) => {
    this.#scene.background = color ? new THREE.Color(color) : new THREE.Color('#000000')
    this.#backgroundColor = this.#scene.background.getStyle()
  }

  #setting = () => {
    console.log('App Setting');
    this.#rendererSetPixelRatio()  // 设置像素比
    this.#rendererSetSize()  // 设置渲染器大小
    this.#rendererDomAppend()  // 将渲染器添加到根节点Dom中
    this.#cameraSetPosition()  // 设置相机位置
    this.#sceneSetBackground(0x50316e)  // 设置场景背景颜色
  }

  #rendererResizeUpdate = () => this.#rendererSetSize()
  #cameraResizeUpdate = () => {
    // 更新宽高比 + 更新相机矩阵
    this.#camera.aspect = this.#getWindowAspectRatio()
    this.#camera.updateProjectionMatrix()
  }

  #update = () => {
    console.log('App Update');
    this.#resizeHandler = () => {
      // 窗口大小改变时更新渲染器和相机的宽高比
      this.#rendererResizeUpdate()
      this.#cameraResizeUpdate()
    }
    window.addEventListener('resize', this.#resizeHandler)
  }

  #animate = () => {
    console.log('App Animate');
    requestAnimationFrame(this.#animate)
    this.#render()
  }

  #render = () => {
    console.log('App Render');
    this.#renderer.render(this.#scene, this.#camera)
  }

  #init = () => {
    console.log('App Init');
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