import esbuild from 'esbuild';
// const esbuild = require('esbuild');
// const { file: brotliSizeFromFile } = require('brotli-size');

const scriptName = 'module';
const watching = process.argv.includes('--watch');

function build(options = {}) {
  options.define || (options.define = {});
  options.define['process.env.NODE_ENV'] = watching
    ? `'development'`
    : `'production'`;

  return esbuild
    .build({
      ...options,
    })
    .then(result => ({ result, options }))
    .catch((e) => {
      // console.error(e);
      process.exit(1)
    });
}

function bytesToSize(bytes) {
  const units = [`byte`, `kilobyte`, `megabyte`];
  const unit = Math.floor(Math.log(bytes) / Math.log(1024));
  return new Intl.NumberFormat("en", { style: "unit", unit: units[unit] }).format(bytes / 1024 ** unit);
}

function buildScripts() {
  // CDN
  build({
    entryPoints: ['builds/cdn.js'],
    outfile: `dist/${scriptName}.js`,
    bundle: true,
    platform: 'browser',
  });

  // CDN — minified
  build({
    entryPoints: ['builds/cdn.js'],
    outfile: `dist/${scriptName}.min.js`,
    bundle: true,
    minify: true,
    platform: 'browser',
  }).then(async ({ options }) => {
    // const { gzipSizeFromFile } = await import('gzip-size');
    // const gzipped = bytesToSize(await gzipSizeFromFile(options.outfile));
    // const brotli = bytesToSize(await brotliSizeFromFile(options.outfile));
    // console.log(`✅ ${ options.outfile }: ${ gzipped } gzipped, ${ brotli } brotli`)
  })

  // ESM
  build({
    entryPoints: ['builds/module.js'],
    outfile: `dist/${scriptName}.esm.js`,
    bundle: true,
    platform: 'neutral',
    mainFields: ['module', 'main'],
  }).then(async ({ options }) => {
    console.log(`✅ ${options.outfile}`)
  })

  // CommonJS
  build({
    entryPoints: ['builds/module.js'],
    outfile: `dist/${scriptName}.cjs.js`,
    bundle: true,
    target: ['node10.4'],
    platform: 'node',
  }).then(async ({ options }) => {
    console.log(`✅ ${options.outfile}`)
  })

  // example
  build({
    entryPoints: ['builds/cdn.js'],
    outfile: `dist/example.js`,
    bundle: true,
  }).then(async ({ options }) => {
    console.log(`✅ ${options.outfile}`)
  })

}

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ['builds/cdn.js'],
    bundle: true,
    outfile: 'dist/example.js'
  })

  await ctx.watch()
}


if (watching) {
  console.log('🎵 Aaaaaaaa WATCH ME NOW 🎵')
  watch()
  buildScripts()
} else {
  buildScripts()
}
