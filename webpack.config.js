const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('cleanup-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const autoprefixer = require('autoprefixer')
const sortMediaQueries = require('postcss-sort-media-queries')
const { merge } = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

const base = () => {
  const config = {
    entry: `${PATHS.source}/main.js`,
    output: {
      path: PATHS.build, // На уровне файловой системе т.е. физ. путь
      filename: '[name].bundle.js',
      publicPath: '/' // для тега script
    },
    context: PATHS.source,
    performance: { hints: false },
    stats: {
      // Вывод в консоль
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/templates'),
          use: ['raw-loader']
        },
        {
          test: /\.(s*)[a|c]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { url: false }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    sortMediaQueries(),
                    autoprefixer({
                      overrideBrowserslist: [
                        'ie >= 8',
                        'last 2 versions',
                        'Android >= 4',
                        'Safari >= 6'
                      ]
                    })
                  ]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@': PATHS.source,
        '@components': PATHS.source + '/components',
        vue$: 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['main'],
        template: PATHS.source + '/templates/index.html'
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new CleanWebpackPlugin({
        include: ['dist']
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'static/images', to: 'images' },
          { from: 'static/fonts', to: 'fonts' }
        ]
      }),
      new FriendlyErrorsPlugin({
        clearConsole: true
      }),
      new ProgressBarPlugin()
    ]
  }
  return config
}

const productionConfig = () => {
  const config = {
    target: 'browserslist'
  }
  return merge(base(), config)
}

const devServerConfig = () => {
  const config = {
    target: 'web',
    devtool: 'source-map',
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      // contentBase: PATHS.build,
      stats: 'errors-only',
      port: 8081,
      overlay: true,
      quiet: false,
      noInfo: true,
      historyApiFallback: true
    },
    plugins: [
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['app is running http://localhost:8081']
        },
        onErrors: (() => {
          const notifier = require('node-notifier')

          return (severity, errors) => {
            if (severity !== 'error') return

            const error = errors[0]
            const filename = error.file

            notifier.notify({
              title: 'Error',
              message: filename,
              icon: './error.png'
            })
          }
        })()
      })
    ]
  }
  return merge(base(), config)
}

module.exports = (env, options) => {
  const isProd = options.mode === 'production'
  // этот хак для live reload, в след. версии webpack-dev-server(4^) должны исправить
  // т.е. сейчас для dev режима в ie11 не будет работать live reload.
  // Эта проблема из-за browserslist в package.json
  // т.е. если прод, то собираем js по «browserslist в package.json», если dev то собираем по web(современный js)
  // conf.target = isProd ? 'browserslist' : 'web'
  return isProd ? productionConfig() : devServerConfig()
}
