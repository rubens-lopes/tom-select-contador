import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: `development`,
  entry: `./src/index.js`,
  devtool: `inline-source-map`,
  devServer: {
    static: `./dist`,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `src/index.html`,
    }),
  ],
  output: {
    filename: `main.js`,
    path: resolve(process.cwd(), `dist`),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          `style-loader`,
          `css-loader`,
        ],
      },
    ],
  },
}
