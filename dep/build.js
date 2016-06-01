({
	appDir: '../', // 建立根目录  后面的目录都是相对这个目录的，除了dir
    baseUrl: "./js", // 开始打包的目录
	skipModuleInsertion: true, // 合并公共组件需要打开这项
	paths: { // 这个目录是相对baseUrl
		'jquery': 'tool/jquery-1.8.3',
		'tip': 'tool/tip'
	},
    dir: "../out", // 输出的目录
	optimizeCss: 'standard',
	modules: [{ 
	// module里面的exclude需要排除的是tools，而不是jquery和tip，这样压缩成功的模块里才不会出现两个config
		name: 'index',
		include: ['main', 'area'],
		exclude: ['tools']
	},{
		name: 'about',
		include: ['info'],
		exclude: ['tools']
	},{
		name: 'tools',
		include: ['jquery', 'tip']
	}],
	fileExclusionRegExp: /^(dep)/, // 排除的文件夹  fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/
	removeCombined: true  // 清除已合并的文件
})

/*打包方式
    第一种打包方式是把公共组件和主模块打包到一起。
    第二种是把业务之间模块打包到一起，组件插件之间模块打包到一起，这样可实现功能模块与业务模块相分离。

总结
    我个人比较倾向第一种打包方式，因为首先可再一次减少请求次数；其次代码都在同一个页面，可以无障碍渲染。而采用第二种方法有一些弊端，比如入口文件需要双require，其次还得多创建一个总路径js文件，最后最大的弊端就是有些页面明明只用到一两个组件，却要把包含所有组件的大文件下载下来显得有些沉重，尤其不适用移动端。而第一种方法则按需加载并无此问题。*/