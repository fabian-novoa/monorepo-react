const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

const defaultConfig = singleSpaDefaults({
  orgName: "ventas",
  projectName: "styleguide",
});

module.exports = mergeWithRules({
  module:{
    rules:{
      test:"match",
      use:"replace"
    }
  }
})(defaultConfig, {
  devServer:{
    port:9005,
    https:Boolean(process.env.HTTPS)
  },
  externals:[/^@ventas\//],
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js"
  },
  module:{
    rules:[
      {
        test:/\.css$/i,
        use:[
          require.resolve("style-loader",{
            paths: [require.resolve("webpack-config-single-spa")]
          }),
          require.resolve("css-loader",{
            paths: [require.resolve("webpack-config-single-spa")]
          }),
          {
            loader: "postcss-loader",
            options:{
              postcssOptions:{
                plugins:[
                  require("tailwindcss"),
                  require("autoprefixer")
                ]
              }
            }
          }
        ]
      },
      {
        test:/\.tsx?$/,
        loader:"ts-loader"
      }
    ]
  }
});

