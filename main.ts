import './app.css';
import handleError from 'handle-error-web';
import { version } from './package.json';
// import { renderFunnels } from './renderers/render-funnels';
import {
  createCameraVectors,
  createFacePointedAtByVector,
} from './updaters/create-schmatics';
import { select, selectAll } from 'd3-selection';
import { Vector, Pt } from './types';

(async function go() {
  window.onerror = reportTopLevelError;
  renderVersion();

  var cameraVectorsDict: Record<string, Vector[]> = {};
  var faceListsDict: Record<string, Pt[][]> = {};

  for (let i = 1; i < 6; ++i) {
    cameraVectorsDict[i] = createCameraVectors({ dimensions: i });
    faceListsDict[i] = cameraVectorsDict[i].map(createFacePointedAtByVector);
  }

  console.log('cameraVectors', cameraVectorsDict);
  console.log('faceLists', faceListsDict);

  // select('.board').attr('width', boardWidth).attr('height', boardHeight);
  // selectAll('.text').classed('hidden', !showText);
})();

function reportTopLevelError(
  _msg: any,
  _url: any,
  _lineNo: any,
  _columnNo: any,
  error: any
) {
  handleError(error);
}

function renderVersion() {
  var versionInfo = document.getElementById('version-info') as HTMLElement;
  versionInfo.textContent = version;
}
