const projectName = require('./project');
const path = require('path');
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
	// console.log("dir",__dirname);
	return path.join(__dirname, dir)
}

// 环境的切换
// let taget = '';
// if (process.env.NODE_ENV == 'development') {    
//     taget = Vue.prototype.$conf.dev_params;} 
// else if (process.env.NODE_ENV == 'production') {    
//     taget = Vue.prototype.$conf.build_params;
// }

const config = {
	projectA: {
		pages: {
			index: {
				entry: 'src/projects/projectA/main.js',
				template: 'public/index.html',
				filename: 'index.html',
			}
		},
		outputDir: 'dist/projectA/',
		devServer: {
			// 设置主机地址
			host: '192.168.2.132',
			// 设置默认端口
			port: "8080",
			//自动打开页面
			open: true,
			//模块热替换
			hot: true,
			//只有热更新不会刷新页面
			hotOnly: true,
			// 设置代理
			proxy: {
				'/mtrade-service/api': {
					// 目标 API 地址
					target: 'http://farm.fv0536.com/mtrade-service/api',
					ws: false,
					// 将主机标头的原点更改为目标URL
					changeOrigin: true,
					pathRewrite: {
						'^/mtrade-service/api': '/'
					},
					// 安全证书校验
					secure: false
				}
			}
		},
		chainWebpack: (config) => {
			config.entry.app = ['babel-polyfill', '../src/projects/projectA/main.js']
			config.resolve.alias
				.set('@', resolve('../src/projects/projectA/'))
				.set('$project', resolve('../src/'))
		},
		configureWebpack: (config) => {
			//开启gzip压缩,需要配置Nginx服务器gzip选项开启
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
					threshold: 10240,
					minRatio: 0.8
				})
			);
		},
	},
	projectB: {
		pages: {
			index: {
				entry: 'src/projects/projectB/main.js',
				template: 'public/index.html',
				filename: 'index.html',
			}
		},
		outputDir: 'dist/projectB/',
		devServer: {
			//自动打开页面
			open: true,
			// 设置主机地址
			host: '0.0.0.0',
			// 设置默认端口
			port: 8080,
			// 设置代理
			proxy: {
				'/api': {
					// 目标 API 地址
					target: '',
					// 如果要代理 websockets
					ws: false,
					// 将主机标头的原点更改为目标URL
					changeOrigin: true,
					pathRewrite: {
						'^/api': ''
					},
					secure: false
				}
			}
		},
		chainWebpack: (config) => {
			config.entry.app = ['babel-polyfill', '../src/projects/projectB/main.js']
			config.resolve.alias
				.set('@', resolve('../src/projects/projectB/'))
				.set('$project', resolve('../src/'))
		}
	}
}

const configObj = config[projectName.name]
module.exports = configObj
