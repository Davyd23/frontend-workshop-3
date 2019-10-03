module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV) // caches babel config between file transforms if this value does not change

  const isTest = api.env('test')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'auto' : false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
    ],
  }
}