console.log('==================5.1.1 ルータの作成==================')
MyRouter = Backbone.Router.extend({
	routes: {
		// ==================5.1.4 すべてのアプリケーショんのルート==================
		'': 'start',
		// ==================5.1.8 プログラムによるナビゲーション==================
		'book/(:name)': 'displayBook',
		// ==================5.1.8 プログラムによるナビゲーション==================

		// ==================5.1.5 ルートへのパラメータの追加==================
		'hello': 'sayHello',
		// 'hello/:name(/:skill)': 'sayHello', // 任意の引数も設定可能
		// 'hello/:name/chapter:chapterNumber': 'sayHello', // プレフィックスも可能
		'hello/*pass': 'sayHello', // 任意の数も指定可能 index.html#hello/jamesのように指定する
		'*default': 'defaultRoute' // ルータが処理できないURLが使用された場合
								   // こいつは最後にかかないといけないっぽい。
								   // これより下にルーティングを書いても認識してくれない
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
		else if(name) ("say hello to " + name )
		else console.log("you're alone.")
	},
	sayGoodbye: function(name){
		if(name) console.log("goodbye " + name + " sann.")
		else console.log("goodbye someone.")
	},
	// ==================5.1.8 プログラムによるナビゲーション==================
	displayBook: function(name){
		console.log("displayBook!!")
		if(name) console.log('displaying ' + name)
		else console.log('no displaying.')
	},
	// ==================5.1.8 プログラムによるナビゲーション==================

	//==================5.1.7 ルートの手動作成==================
	initialize: function(options){
		this.route("goodbye(/:name)", "sayGoodbye") // こうするとroutesでルートを定義しなくても
		　　　　　　　　　　　　　　　　　　　　　　　　 // index.html#goodbye/james でsayGoodbyeへのルートを作れた！
		this.route("callback", "dummy", function(){ // 第3引数にはcallback関数を定義可能。第二引数のメソッドは実行されない
			console.log("callback invoked!!")		// index.html#callback でコールバック関数が呼ばれる
		})
	}
	// ==================5.1.7 ルートの手動作成==================
})

var router = new MyRouter()
Backbone.history.start()　// http://localhost/xamppBackbone/index.html#helloにアクセスするとsayHelloが実行される


console.log('==================5.1.2 Backbone.History==================')
// 特になし

console.log('==================5.1.3 pushStateの使用==================')

// Backbone.history.start()

// 全てのURLをindex.htmlにルーティングする必要あり　→　httpd.confファイル or server.jsを修正
// Backbone.history.start({pushState: true, root: "/chapter5"})

// console.log('==================5.1.6 ルートのイベント==================')
// router.on("route:sayHello", function(page){}) // 戻るを押した時に実行される


// console.log('==================5.1.8 プログラムによるナビゲーション==================')
function showBook(name){
	console.log('show book ' + name)
	router.navigate("book/" + name, {trigger: true}) // ここでURLを変更し、画面遷移させている。
													 // だからindex.htmlを指定してもindex.html#book/:nameに遷移される
													 // triggerをfalseにするとURLを遷移させるだけで処理は実行しない
													 // つまり上の方の'book/(:name)': 'displayBook'には行かず、displayBookは実行されない
	// router.navigate("book/" + name, {trigger: true, replace: true}) // replace: trueを指定すると、ブラウザの履歴に登録されない
}
showBook("Backbone")