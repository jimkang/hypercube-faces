import './app.css';
import handleError from 'handle-error-web';
import { version } from './package.json';
// import { renderFunnels } from './renderers/render-funnels';
import { createCameraVectors } from './updaters/create-schmatics';
import { select, selectAll } from 'd3-selection';

(async function go() {
  window.onerror = reportTopLevelError;
  renderVersion();

  var cameraVectors3D = createCameraVectors({ dimensions: 3 });

  console.log('1', createCameraVectors({ dimensions: 1 }));
  console.log('2', createCameraVectors({ dimensions: 2 }));
  console.log('3', createCameraVectors({ dimensions: 3 }));
  console.log('4', createCameraVectors({ dimensions: 4 }));
  console.log('5', createCameraVectors({ dimensions: 5 }));
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
