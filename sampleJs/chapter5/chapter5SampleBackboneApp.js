console.log('==================5.1.1 ルータの作成==================')
MyRouter = Backbone.Router.extend({
	model: null,
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
		if(name){
			console.log('displaying ' + name)
			this.model.set("currentBook", name)
		} else console.log('no displaying.')
	},
	// ==================5.1.8 プログラムによるナビゲーション==================

	//==================5.1.7 ルートの手動作成==================
	initialize: function(options){
		// ==================5.1.9 コントローラとしてのルータ==================
		this.model = options.model
		// ==================5.1.9 コントローラとしてのルータ==================
		this.route("goodbye(/:name)", "sayGoodbye") // こうするとroutesでルートを定義しなくても
		　　　　　　　　　　　　　　　　　　　　　　　　 // index.html#goodbye/james でsayGoodbyeへのルートを作れた！
		this.route("callback", "dummy", function(){ // 第3引数にはcallback関数を定義可能。第二引数のメソッドは実行されない
			console.log("callback invoked!!")		// index.html#callback でコールバック関数が呼ばれる
		})
	}
	// ==================5.1.7 ルートの手動作成==================
})

// 5.1.9のため、コメントアウト
// var router = new MyRouter()
// Backbone.history.start()　// http://localhost/xamppBackbone/index.html#helloにアクセスするとsayHelloが実行される


console.log('==================5.1.2 Backbone.History==================')
// 特になし

console.log('==================5.1.3 pushStateの使用==================')

// 5.1.9のため、コメントアウト
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

// 5.1.9のため、コメントアウト
// showBook("Backbone")

console.log('==================5.1.9 コントローラとしてのルータ==================')
AppModel = Backbone.Model.extend({
	initialize: function(){
		this.on("change", function(){
			if(this.hasChanged("currentBook")){
				console.log('current book changed')
			}
		})
	},
	// オブジェクトのプロパティの定義
	defaults: {
		currentBook: 'Beggining Backbone'
	}
})
var appModel = new AppModel
var router = new MyRouter({model: appModel})
Backbone.history.start()


console.log('==================5.2.1 イベントのバインディング==================')
// Bookを新規に定義
Book = Backbone.Model.extend({
	// オブジェクトのプロパティの定義
	initialize: function(){
		console.log('a new book')
	},
	defaults: {
		name: 'Book Title',
		author: 'No One'
	}
})

// 適当にBookモデルにchangeイベントを設定
var model = new Book()
model.on("change", function(){
	console.log('an attribute has been changed.')
})
// 任意の属性に対してイベントを設定。スペースを挟むと複数の属性に設定可能
model.on("change:author change:title", function(){
	console.log('the author attribute has been changed.')
})
// 全てのイベントを監視することもできるらしい。
// 一つのオブジェクト（model）に全てのイベントをデリゲートできる
model.on('all', function(eventName){
	model.trigger(eventName) // eventNameという名前のイベントを発生させる
})

// viewを作る。viewにイベント（updateTitleView）をバインドしている
BookView = Backbone.View.extend({
	updateTitleView: function(model){
		// console.log(model)
		console.log('updating title view. before->' + model._previousAttributes.name + ', after->' + model.attributes.name)
	},
	updateAllAttribute: function(attrs){ // triggerで実行されるように作成したので、渡されるのはoption（triggerの第二引数）
		console.log('updating view. name->' + attrs.name + ' , author->' + attrs.author)
	}

})

// 適当にviewを作る
var bookView = new BookView()
// 適当にmodelを作る
var thisBook = new Book({name: '5.2.1Name', author: '5.2.1Author'})
// イベントをバインド
thisBook.on('change:name', bookView.updateTitleView) // 関数には自身のmodelが渡される
// 属性を変更。updateTitleViewを発火する
thisBook.set('name', 'afterName')


console.log('==================5.2.2 イベントのバインディングの解除==================')
// thisBook.off('change:name') // thisBookの全てのname属性の変更（change）イベントを解除
thisBook.off('change:name', bookView.updateTitleView) // 変更イベントだけ解除

thisBook.on('change:author', bookView.updateTitleView)
thisBook.off(null, bookView.updateTitleView) // 全てのイベントとのバインディングを解除
thisBook.set('author', 'ccc')
console.log(thisBook) // authorはcccのはず
thisBook.off() // thisBookの全てのイベントを解除

console.log('==================5.2.3 イベントを１回だけ処理する==================')
thisBook.once({'change:name': bookView.updateTitleView})
thisBook.set('name', 'aaa') // １回目のchangeイベント
thisBook.set('name', 'bbb') // ２回目のchangeイベント
thisBook.off() // イベントバインディングをいったんクリア

console.log('==================5.2.4 他のオブジェクトでのイベントの待ち受け==================')
thisBook.on('change:name', bookView.updateTitleView) // ①modelオブジェクトにviewのイベントをバインド
thisBook.set('name', 'ddd')
thisBook.off(null, bookView.updateTitleView) // イベントバインディングをいったんクリア

bookView.listenTo(thisBook, 'change:name', bookView.updateTitleView) // ②viewのオブジェクトにmodelオブジェクトを追跡させる
thisBook.set('name', 'eee')
// ー＞①と②は同じ挙動をする。

bookView.stopListening(thisBook) // viewオブジェクトの追跡を停止する
bookView.stopListening() // こっちは全ての追跡を停止する
thisBook.set('name', 'zzz') // 停止しているからイベントが実行されない

bookView.listenToOnce(thisBook, 'change:name', bookView.updateTitleView)
thisBook.set('name', 'fff') // こっちは追跡されるからupdateTitleViewが実行される
thisBook.set('name', 'ggg') // こっちはバインドが解除されるから実行されない

console.log('==================5.2.5 イベントの生成==================')
thisBook.on('change', bookView.updateAllAttribute) // イベントハンドラupdateAllAttributeにchangeイベントをバインド（実行はされない）
thisBook.trigger('change', {name: 'triggerName', author: 'cccc'}) // 指定したイベントを実行する。
										// この場合、change:authorイベントにバインドした
										// イベントハンドラupdateAllAttributeの引数に{name: 'triggerName', author: 'cccc'}が渡される。
										// 参考サイト：http://nacika.com/entry/2013/08/04/204927/
										// triggerはcollection、model、view、router、グローバルと全てのオブジェクトに使用可能
console.log(thisBook) // changeイベントを発生させただけでsetしているわけではないので、属性の値はかわらない
thisBook.off() // イベントバインディングをクリア

console.log('==================5.2.7 カスタムイベントの作成==================')
Backbone.on('model:useless', function(options){
	console.log('Model uselexx global invoked')
	// console.log('options: ' + options.param) // 上のtriggerと同じ使い方 - ※※※
	console.log('options: model.name->' + options.model.get('name'))
	console.log('options: model.author->' + options.model.get('author'))
	// イベントの処理を記述
})
thisBook.on('change:name change:author', function(changedModel, value, options){ // model:イベントを実行するオブジェクト、value:setの第二引数、options:silentなどのoption
	console.log('changedModel')
	console.log(changedModel)
	console.log('value')
	console.log(value)
	console.log('options')
	console.log(options)
	if(changedModel.get('name') === null && changedModel.get('author') === null) {
		console.log('trigger event now')
		// Backbone.trigger('model:useless', {param: 'global useless'}) // 上のtriggerと同じ使い方 - ※※※
		Backbone.trigger('model:useless', {model:changedModel}) // changeイベントで渡された、イベントが生成されたmodelを渡すことができる
	}
})

thisBook.set('name', null, {silent: true}) // silentを指定しているため、ここではmodel:uselessイベントは発火しない
thisBook.set('author', null) // ここでmodel:uselessのグローバルイベントが発火する

console.log('==================5.2.8 DOMイベントの処理==================')
// ４章でやったclickイベントへのバインディングもできるよーって再度載せているだけっぽい

// thisBookに属性を再度セット
thisBook.set('name', 'DomName', {silent: true})
thisBook.set('author', 'DomAuthor', {silent: true})

// ==================4章をもう一度記述==================
// Bookに基づいてコレクションを定義
Library = Backbone.Collection.extend({
	model: Book,
	initialize: function(){
		console.log('create library Collection')
	}
})

// collectionオブジェクトを作成
var mylibrary = new Library()
// collectionにmodelを追加
mylibrary.add(thisBook)
mylibrary.add(new Book({name: 'Dom2Name', author: 'Dom2Author'}))
// viewの定義
LibraryView = Backbone.View.extend({
	initialize: function(){
		this.render()
	},
	render: function(){
		var self = this
		for(var i=0;i<self.collection.size();i++){
			self.$el.append('<li id="book">Book Name: ' + self.collection.at(i).get('name') + 
				', Book Author: ' + self.collection.at(i).get('author') + '</li>')
		}
		return self
	},
	events: {
		'click #book' : 'alertBook', // DOMのイベントにも追加できるよって話らしい
		// 'click ' : 'alertBook' // これでルートのelに設定される クリックすると一つ上のイベントとルートのイベント２回呼び出される

	},
	alertBook: function(e){
		alert('book clicked name is ' + this.collection.models[0].attributes.name) // クリックしたmodelを特定する方法は忘れた
	}
})
// viewオブジェクトを生成
var eventlibraryview = new LibraryView({
	collection: mylibrary, // collectionに上で作成したcollectionを指定
	el: '#myLibraryViewSection' // htmlでidに指定しているから#が必要
})
// ==================4章をもう一度記述==================


