import { EvaluateFailure, GaurdStatus} from "../DyvixGuard";
import Version from "../../../package.json"

export const CACHETYPE = { CSS: 'css', ANIMATION: 'animation' };
const VERSION = Version['version'];


export async function SJCManager(jsonpath, csspath, type, component, utility, jsonKey, jsonclasskey="") {
  const layerOneResult = null; // plug the actual func
  if (layerOneResult !== null) return layerOneResult;
  const layerTwoResult = null; // plug the actual func
  if (layerTwoResult !== null) return layerTwoResult;
  const layerThreeResult = await cachelayerThree(jsonpath, csspath, type, 3, component, utility, jsonKey, jsonclasskey);
  return layerThreeResult;
}

async function cachelayerThree(jsonpath, csspath, type, layer, component, utility, jsonKey, jsonclasskey) {
 const key = generateCacheKey(3, "Modal", "theme");

  if(localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));;

  const rawJSONText = await extractFile(jsonpath); 
  const JsonArray = JSON.parse(rawJSONText);
  const jsonResult = JsonArray.find(e => e[utility] === jsonKey);
  let rawCSS = null;

  let cssResult = null;
  if (type === CACHETYPE.CSS) {
    rawCSS = await extractFile(csspath);
  }

  let value = {
    ...(rawCSS !== null && {"CSS": rawCSS}),
    ...(JsonArray !== null && {"JSON": JsonArray}),
  };

  let result = {
    ...(cssResult !== null && {"CSS": cssResult}),
    ...(jsonResult !== null && {"JSON": jsonResult}),
  }
  localStorage.setItem(key, JSON.stringify(value));

  return true;
}
function cachelayerTwo(type, classname = 'None', jsonpath) {
 const key = generateCacheKey(2, component, utility);

  if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key));
  }

  const rawJSONText = await extractFile(jsonpath); 

  const JsonArray = JSON.parse(rawJSONText);
  const jsonResult = JsonArray.find(e => e[utility] === jsonKey);
  let cssResult = null;

  if (type === CACHETYPE.CSS) {
    cssResult = extractCSSClass(jsonResult[jsonclasskey], csspath)
  }

  let value = {
    ...(cssResult !== null && {"CSS": cssResult}),
    ...(jsonResult !== null && {"JSON": JSON.stringify(jsonResult)}),
  };

  localStorage.setItem(key, JSON.stringify(value));

  return JSON.stringify(value);
}

function cachelayerOne(type, classname = 'None', jsonpath) {
  extractCSSClass(
    'dyvix-modal-ember',
    '../../components/modal/dependencies/style/themes.css'
  );
  if (type === CACHETYPE.CSS) {
  }
}

async function extractFile(path)
{
  try {
    const module = await import(/* @vite-ignore */ `${path}?raw`);
    return module.default || module;
  } catch (error) {
    console.log('DyvixUI Sys error');
    return null;
  }
}

function generateCacheKey(layer, component, utility) {
  const key = `DYVIX_${VERSION}_${layer}_${component}_${utility}`;

  return key;
}


async function extractCSSClass(classname, Csspath=null, cssblock=null) {
  const rawCSS;
  if(csspath !== null)
  {
    try {
      const module = await import(/* @vite-ignore */ `${Csspath}?raw`);
      rawCSS = module.default || module;
    } catch (error) {
      console.log('DyvixUI Sys error');
    }
  }
  else if (cssblock !==null)
  {
    rawCSS = cssblock
  }
  else
  {
    return null;
  }

  const lines = rawCSS.replace(/\s+/g, ' ').trim().split('}');
  let block = '';
  const matches = lines
    .filter((val) => val.trim().includes(classname))
    .map((block) => block.trim() + '}');
  block = matches.join('\n\n');

  return block;
}
