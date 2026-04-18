export const CACHETYPE = { CSS: 'css', ANIMATION: 'animation' };

export function cachelayerThree(type, classname = 'None', jsonpath) {
  extractCSSClass(
    'dyvix-modal-ember',
    '../../components/modal/dependencies/style/themes.css'
  );
  if (type === CACHETYPE.CSS) {
  }
}

async function extractCSSClass(classname, Csspath) {
  try {
    const module = await import(/* @vite-ignore */ `${Csspath}?raw`);
    const rawCSS = module.default || module;
    const lines = rawCSS.replace(/\s+/g, ' ').trim().split('}');
    let block = '';
    const matches = lines
      .filter((val) => val.trim().includes(classname))
      .map((block) => block.trim() + '}');
    block = matches.join('\n\n');

    return block;
  } catch (error) {
    console.log('DyvixUI Sys error');
  }
}
