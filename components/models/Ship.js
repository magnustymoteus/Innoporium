import "@google/model-viewer";
const Ship = () => (
  <model-viewer bounds="tight" src="/models/ship.glb" camera-controls autoplay exposure="0.2" auto-rotate min-camera-orbit="auto auto 2.237m" min-field-of-view="45deg" interaction-policy="allow-when-focused" loading="eager"/>
)

export default Ship;