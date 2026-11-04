// Hero 3D: haqiqiy skanerlangan krossovka (GLB + KHR_materials_variants).
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { RoomEnvironment } from '../vendor/RoomEnvironment.js';

const canvas = document.getElementById('shoe');
const stage = document.querySelector('.hero__stage');
const loader = document.querySelector('.hero__loader');

function fail() {
  document.documentElement.classList.add('no3d');
  if (loader) loader.remove();
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) { fail(); }

if (renderer) {
  const mobile = matchMedia('(max-width: 820px)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.62;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 50);
  camera.position.set(0, 0.34, 3.5);
  camera.lookAt(0, 0, 0);

  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(2.2, 3.4, 2.4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd9ff6b, 0.9);
  rim.position.set(-3, 1.2, -2.6);
  scene.add(rim);

  // Yumshoq kontakt soya (gilam ustida turgandek)
  const sc = document.createElement('canvas');
  sc.width = sc.height = 256;
  const g = sc.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 8, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,0,0,.72)');
  grad.addColorStop(.55, 'rgba(0,0,0,.28)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.62, 0.92),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  scene.add(shadow);

  const rig = new THREE.Group();   // scroll + sudrash
  scene.add(rig);

  // Holat
  const S = { progress: 0, drag: 0, dragV: 0, tiltX: 0, tiltY: 0, intro: 0, spin: 0 };
  let visible = true, dragging = false, lastX = 0, gltf = null, mesh = null, original = null;

  function size() {
    const r = stage.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    // Tor ekranda krossovka to'liq sig'ishi uchun kamerani uzoqlashtiramiz
    const fit = camera.aspect < 1 ? 1 / camera.aspect : 1;
    camera.position.z = 3.5 * Math.min(fit, 1.9);
    camera.updateProjectionMatrix();
  }
  size();
  addEventListener('resize', size);
  new IntersectionObserver(e => { visible = e[0].isIntersecting; }, { threshold: 0 }).observe(stage);

  new GLTFLoader().load('assets/3d/shoe-1280.glb', async res => {
    gltf = res;
    const root = res.scene;
    const box = new THREE.Box3().setFromObject(root);
    const sz = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    const k = 1.32 / Math.max(sz.x, sz.y, sz.z);
    root.scale.setScalar(k);
    root.position.set(-c.x * k, -box.min.y * k, -c.z * k);
    // Oyoq kiyim uzun o'qi X bo'ylab tursin
    if (sz.z > sz.x) rig.userData.base = -Math.PI / 2; else rig.userData.base = 0;
    rig.add(root);
    root.traverse(o => { if (o.isMesh && o.userData.gltfExtensions?.KHR_materials_variants) { mesh = o; original = o.material; } });
    rig.position.y = -0.22;
    shadow.position.y = -0.215;
    window.dispatchEvent(new CustomEvent('shoe-ready'));
    if (loader) loader.classList.add('is-done');
    document.documentElement.classList.add('has3d');
    await select(window.__variant || 'midnight');
    window.__shoeReady = true;
  }, ev => {
    if (loader && ev.lengthComputable) {
      loader.style.setProperty('--p', Math.round(ev.loaded / ev.total * 100) + '%');
    }
  }, fail);

  async function select(name) {
    if (!gltf || !mesh) return;
    const ext = gltf.userData.gltfExtensions.KHR_materials_variants;
    const idx = ext.variants.findIndex(v => v.name === name);
    const map = mesh.userData.gltfExtensions.KHR_materials_variants.mappings.find(m => m.variants.includes(idx));
    mesh.material = map ? await gltf.parser.getDependency('material', map.material) : original;
    gltf.parser.assignFinalMaterial(mesh);
    mesh.material.needsUpdate = true;
  }

  // Tashqi API (app.js dan)
  window.Shoe = {
    set progress(v) { S.progress = v; },
    variant(name) { window.__variant = name; S.spin = 1; return select(name); },
  };

  // Sudrab aylantirish (faqat gorizontal — sahifa aylantirishga xalaqit bermaydi)
  canvas.style.touchAction = 'pan-y';
  canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); stage.classList.add('is-drag'); });
  canvas.addEventListener('pointermove', e => {
    if (!dragging) {
      if (!mobile) {
        const r = canvas.getBoundingClientRect();
        S.tiltX = ((e.clientY - r.top) / r.height - .5) * .16;
        S.tiltY = ((e.clientX - r.left) / r.width - .5) * .22;
      }
      return;
    }
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    S.dragV = dx * .012;
    S.drag += S.dragV;
  });
  const stop = () => { dragging = false; stage.classList.remove('is-drag'); };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);

  const clock = new THREE.Clock();
  let shownP = 0, tx = 0, ty = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { clock.getDelta(); return; }
    const dt = Math.min(clock.getDelta(), .05);
    const t = clock.elapsedTime;
    if (gltf) {
      S.intro += (1 - S.intro) * Math.min(1, dt * 2.2);
      shownP += (S.progress - shownP) * Math.min(1, dt * 6);
      if (!dragging) { S.dragV *= .94; S.drag += S.dragV; }
      S.spin *= .93;
      tx += (S.tiltX - tx) * .06; ty += (S.tiltY - ty) * .06;
      const idle = still ? 0 : Math.sin(t * .5) * .1;
      rig.rotation.y = (rig.userData.base || 0) - .62 + idle + shownP * Math.PI * 2 + S.drag + ty + S.spin * Math.PI * 2 + (1 - S.intro) * -1.4;
      rig.rotation.x = tx;
      const float = still ? 0 : Math.sin(t * 1.1) * .012;
      rig.position.y = -.22 + float + (1 - S.intro) * .28;
      shadow.material.opacity = S.intro * (1 - float * 10);
      rig.scale.setScalar(.82 + S.intro * .18);
      shadow.scale.setScalar(.82 + S.intro * .18);
      // Faktlar chiqqanda krossovka yon tomonga suriladi (desktop)
      const side = mobile ? 0 : Math.min(1, shownP * 5) * .42;
      rig.position.x = shadow.position.x = side;
      rig.position.z = shadow.position.z = 0;
    }
    renderer.render(scene, camera);
  }
  frame();
}
