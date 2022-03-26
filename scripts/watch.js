require('esbuild').build({
    entryPoints: ['src/background.js', 'src/scripts/scrapper.js'],
    outdir: 'static',
    bundle: true,
    inject: ['config/env.js'],
    watch: true,
    
  }).then(result => {
    console.log('watching...')
    console.log(result)
  })