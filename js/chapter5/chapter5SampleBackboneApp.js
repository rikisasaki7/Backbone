console.log('==================5.1.1 ルータの作成==================')
MyRouter = Backbone.Router.extend({
	routes: {
		// ==================5.1.4 すべてのアプリケーショんのルート==================
		'': 'start',
		// ==================5.1.5 ルートへのパラメータの追加==================
		// 'hello': 'sayHello',
		// 'hello/:name(/:skill)': 'sayHello', // 任意の引数も設定可能
		// 'hello/:name/chapter:chapterNumber': 'sayHello', // プレフィックスも可能
		'hello/*pass': 'sayHello', // 任意の数も指定可能
		'*default': 'defaultRoute' // ルータが処理できないURLが使用された場合
		// ==================5.1.5 ルートへのパラメータの追加==================
	},
	start: function(){
		console.log('initial')
	},
	defaultRoute: function(){
		console.log('Router does not handle this route')
		// ==================5.1.4 すべてのアプリケーショんのルート==================
	},

	sayHello: function(name, skill){
		if(skill) console.log("say hello to " + name + ', skill→ ' + skill)
		else console.log("say hello to " + name )
	}
})

var router = new MyRouter()
// Backbone.history.start()
// http://localhost/xamppBackbone/index.html#helloにアクセスするとsayHelloが実行される


console.log('==================5.1.2 Backbone.History==================')
// 特になし

console.log('==================5.1.3 pushStateの使用==================')

Backbone.history.start()

// 全てのURLをindex.htmlにルーティングする必要あり　→　httpd.confファイル or server.jsを修正
// Backbone.history.start({pushState: true, root: "/chapter5"})

console.log('==================5.1.6 ルートのイベント==================')
router.on("route:sayHello", function(page){}) // 戻るを押した時に実行される

console.log('==================5.1.7 ルートの手動作成==================')

