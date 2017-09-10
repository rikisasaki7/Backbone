console.log('==================4.2.1 ビューの作成==================')

// 3章がうっとおしいので新規に定義
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
// Bookに基づいてコレクションを定義
Library = Backbone.Collection.extend({
	model: Book,
	initialize: function(){
		console.log('create library Collection')
	}
})

var mylibrary = new Library()

// Libraryの定義
LibraryView = Backbone.View.extend({
	initialize: function(){
		console.log('view created')
	}
})

console.log('==================4.2.2 物理ビューへのバインディング==================')

// モデルと要素を使ってビューのインスタンスを作成
var viewbook = new Book({name: 'viewname', author: 'viewauthor'})
var myview = new LibraryView({
	model: viewbook,
	el: '#myLibraryViewSection' // htmlでidに指定しているから#が必要
})

// dom要素を独自に構築するビューを作成
var myview = new LibraryView({
	model: viewbook,
	tagName: 'ul', // 適用するhtmlのクラスを指定
	className: 'libraryView', // 適用するcssのクラスを指定
	attributes: {'date-data': new Date()}
})
console.log(myview.el)

console.log('==================4.2.3 コンテンツのレンダリング==================')

// Libraryの定義
RenderLibraryView = Backbone.View.extend({
	initialize: function(){
		this.render()
	},
	render: function(){
		// サブビューを全て追加する場合
		// this.$el.html('book name: ' + this.model.get('name'))
		// for(var i=0;i<this.subviews.length;i++){
		// 	this.$el.append(this.subviews[i].render().el)
		// }

		// 要素をレンダリング
		// for(var i=0;i<this.collection.size();i++){
		// 	this.$el.append('<li>book name: ' + this.collection.at(i).get('name') + '</li>')
		// }

		// 要素をレンダリング id付与
		for(var i=0;i<this.collection.size();i++){
			var bookname = this.collection.at(i).get('name')
			this.$el.append('<li id=\'' + bookname + '\'>Book name: ' + bookname + '</li>')
		}
		return this // 連続したレンダリングを可能にするため、自分自身をreturn
	}
})


mylibrary.add(viewbook)
var mylibraryview = new RenderLibraryView({
	collection: mylibrary,
	el: '#myLibraryViewSection' // htmlでidに指定しているから#が必要
})

// mylibraryview.remove()

// ビューでの要素の検索
var found = mylibraryview.$el.find('#viewname')
console.log(found)

var found2 = $('#viewname')
console.log(found2)


// DOM要素の変更
mylibraryview.setElement('#anotherViewSection')
console.log(mylibraryview) // elが置き換わっている。renderしないから画面は変化しない


console.log('==================4.2.4 ビューのイベント==================')


// Libraryの定義
EventLibraryView = Backbone.View.extend({
	initialize: function(){
		this.render()
	},
	render: function(){
		console.log('==================4.2.5 selfとthisの処理==================')
		var self = this
		for(var i=0;i<self.collection.size();i++){
			self.$el.append('<li id="book">Book Name: ' + self.collection.at(i).get('name') + '</li>')
		}
		return self
		console.log('==================4.2.5 selfとthisの処理==================')

		// for(var i=0;i<this.collection.size();i++){
		// 	this.$el.append('<li id="book">Book Name: ' + this.collection.at(i).get('name') + '</li>')
		// }
		// return this
	},
	events: {
		'click #book' : 'alertBook',
		'click ' : 'alertBook' // これでルートのelに設定される クリックすると一つ上のイベントとルートのイベント２回呼び出される

	},
	alertBook: function(e){
		alert('book clicked')
	}
})

var eventlibraryview = new EventLibraryView({
	collection: mylibrary,
	el: '#myLibraryViewSection' // htmlでidに指定しているから#が必要
})

// イベントを上書きする
eventlibraryview.delegateEvents({
	'mouseover #book' : 'alertBook'
})
// イベントをクリアする
eventlibraryview.undelegateEvents()



console.log('==================4.4 Underscoreによるテンプレート化==================')
UnderScoreLibraryView = Backbone.View.extend({
	initialize: function(){
		this.render()
	},
	// template: _.template($("library-template").html()),
	render: function(){
		var self = this
		var jsonCol = {"name": "jsonname", "author": "jsonauthor"}
		// template: を定義しない場合、こちらでもいける
		// #library-templateを見つけられていない。たぶんelに別のDOM指定しているから
		var output = _.template($("#library-template").html(), {'library': jsonCol})
		self.$el.append(output)
		console.log(self)
		console.log(output)
		return self
	}
})

// console.log(viewbook.toJSON())
// var underlibraryview = new UnderScoreLibraryView({
// 	el: '#myLibraryViewSection' // htmlでidに指定しているから#が必要
// })
