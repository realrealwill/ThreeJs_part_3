import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
// import App from "../App";
import * as UTILS from "@/Utils";
import Panel from '@/gui/Panel'

export default class Loader {
  // 存储渲染器
  #renderer = undefined;
  // 存储场景
  #scene = undefined;
  // 存储相机
  #camera = undefined;
  // 存储实例
  #app = undefined;
  // 模型路径
  #modelPath = undefined;
  // 环境光
  #envLight = undefined;
  // gltfmoxing
  #gltf = undefined;
  // 模型
  #model = undefined;
  get model() {
    return this.#model
  }

  // 加载器
  #loader = new GLTFLoader()
  get loader() {
    return this.#loader
  }

  #panel = undefined;
  get panel() {
    return this.#panel
  }

  #init = () => {
    //编解码
    this.#rendererEncoder()
    // 场景添加光源
    this.#sceneAddLight()
  }


  // --------------------渲染器编解码------------------
  #rendererEncoder = () => {
    this.#renderer.outputEncoding = THREE.sRGBEncoding;
    this.#renderer.gammaOutput = true;
  }

  // -------------------- 环境光 ---------------------
  #setEnvLightLevel = (level) => {
    if (UTILS.isNumber(level)) {
      this.#envLight.intensity = level;
    }
  }

  // 场景添加光源
  #sceneAddLight = () => {
    // 环境光
    this.#envLight = new THREE.AmbientLight(0x404040);
    this.#scene.add(this.#envLight);
    this.#setEnvLightLevel(3)
  }

  // -------------------- 加载器 ---------------------

  #loadGltf = async () => {  // 将modelPath里的gltf异步加载出来返回
    return await this.#loader.loadAsync(this.#modelPath)
  }

  // 加载模型
  #load = async () => {
    this.#gltf = await this.#loadGltf()  // 异步加载给#gltf
    this.#model = this.#gltf.scene  // 将#gltf.scene赋值给#model
    this.#scene.add(this.#model)  // 将#model添加到场景中
    // GUI Panel
    this.#panel = new Panel(this.#app, this)
  }

  constructor(app, modelPath) {
    this.#app = app;
    this.#renderer = app.renderer;
    this.#scene = app.scene;
    this.#camera = app.camera;
    this.#modelPath = modelPath;

    this.#init()  // 初始化
    this.#load()  // 加载出来模型
  }
}