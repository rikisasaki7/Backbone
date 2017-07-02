console.log('==================3.2 Backboneのモデル==================')
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

var myBook = new Book()
console.log(myBook)


console.log('==================3.2.2 モデルの属性==================')
// 属性値の取得
console.log(myBook.get('name'))
var thisBook = new Book({name: 'beginning backbone', author: 'james'})
console.log(thisBook.get('name') + ' by ' + thisBook.get('author'))
console.log(thisBook.attributes) // すべての属性のJSON表現

// 属性値の変更
thisBook.set('name', 'changing backbone')
thisBook.set('year', 2013)

// 属性の削除
console.log('book year' + thisBook.get('year'))
thisBook.unset('year')
console.log('book year' + thisBook.get('year'))

// 属性の存在を確認
var hasYear = thisBook.has('year')
var hasName = thisBook.has('name')
console.log('does have year:' + hasYear)
console.log('does have name: ' + hasName)

// 新しいインスタンスを作成
var newBook = new Book({name: 'name', author: 'author'})
// 属性を全て削除
newBook.clear()
// newbook.hasがfalseを返す
console.log('does have year:' + newBook.has('year'))
console.log('does have name:' + newBook.has('name'))

// 属性の削除
thisBook.unset('name', {silent: true})
console.log(thisBook)

// モデルの複製
var cloneBook = thisBook.clone()
console.log(cloneBook) // 厳密には同じ属性を渡してコンストラクタが呼ばれるっぽいん。
                       // 属性が設定されておらず、デフォルト値が設定されているものは
                       // デフォルト値がセットされることに注意


console.log('==================3.2.3 モデルに関数を追加する==================')
ThreeBook = Backbone.Model.extend({
	// オブジェクトのプロパティの定義
	initialize: function(){
		console.log('a new threeBook')
	},
	defaults: {
		name: 'threeBook Title',
		author: 'No One three'
	},
	printDetails: function(){
		console.log(this.get('name') + ' by ' + this.get('author'))
	}
})

var threeBook = new ThreeBook({name: 'threebookname', author: 'threeauthor'})
threeBook.printDetails()

console.log('==================3.2.4 モデルのイベント==================')

FourBook = Backbone.Model.extend({
	// オブジェクトのプロパティの定義
	initialize: function(){
		this.on("change", function(){
			console.log("model changes detected")
			if(this.hasChanged('name')){
				console.log('haschanged then name has changed')
				console.log('name changed from ' + this.previous('name') + ' to ' + this.get('name'))
			}
			if(this.hasChanged('year')){
				console.log('haschanged then year has changed')
			}
			console.log('changed attributes: ' + JSON.stringify(this.changed))
			console.log('previous attributes: ' + JSON.stringify(this.previousAttributes()))
		})
		this.on("change:name", function(){ // 属性指定の方が先に呼ばれる
			console.log("name changed")
		})
		console.log('a new fourBook')
	},
	defaults: {
		name: 'fourBook Title',
		author: 'No One four'
	},
	printDetails: function(){
		console.log('calledPrintDetails ' + this.get('name') + ' by ' + this.get('author'))
	}
})

var fourBook = new FourBook({name: 'fourbookname', author: 'fourauthor'})

// 変数を設定（本来ならchangeハンドラが呼び出される）
// changeハンドラが呼び出される
fourBook.set("name", 'Different book')
// changeハンドラが呼び出されない
fourBook.set("name", 're different', {silent: true})
console.log(fourBook)

console.log('==================3.2.5 モデルの検証==================')
FiveBook = Backbone.Model.extend({
	// オブジェクトのプロパティの定義
	initialize: function(){
		console.log('a new fiveBook')
		this.on('invalid', function(model, error){
			console.log('**validation error: ' + error + "**")
			// console.log('**error model: ')
			// console.log(model) // 何も渡されていない
		})
	},
	defaults: {
		name: 'fiveBook Title',
		author: 'No One five'
	},
	// set/unset呼び出し時にvalidate: trueにしたら実行される
	validate: function(attrs){
		if(!attrs.name){
			console.log('require name')
			return 'a name must be provided.'
		}
		if(!attrs.year){
			console.log('require year')
			return 'a year must be provided.'
		}
		if(attrs.year < 2000){
			console.log('lager than 2000')
			return 'year must be after 2000, realValue=' + attrs.year
		}
	}
})

var fiveBook = new FiveBook({name: 'fivebookname', author: 'fiveauthor'})

// nameを再設定
fiveBook.set('name', 'reset fivename', {validate: true})
console.log(fiveBook)

// 2000年よりも前の年を設定
fiveBook.set('year', 1999, {validate: true})
console.log(fiveBook)

// モデルから名前を削除
fiveBook.unset('name', {validate: true})
console.log('check if name was removed: ' + fiveBook.get('name'))

// モデルが有効かどうかをチェック
console.log('is model valid: ' + fiveBook.isValid())

// validateフラグを指定しない状態でルール違反
fiveBook.set('year', 1998)

// モデルが有効かどうかをチェック
console.log('is model valid: ' + fiveBook.isValid())


console.log('==================3.2.6 サーバーとのデータ交換==================')
// モデルの保存
SixBook = Backbone.Model.extend({

	urlRoot: 'http://localhost:8080/books/',
	// オブジェクトのプロパティの定義
	initialize: function(){
		console.log('a new sixBook')
	},
	defaults: {
		name: 'sixBook Title',
		author: 'No One five'
	},
	// set/unset呼び出し時にvalidate: trueにしたら実行される
	validate: function(attrs){
		if(!attrs.name){
			console.log('require name')
			return 'a name must be provided.'
		}
		if(!attrs.year){
			console.log('require year')
			return 'a year must be provided.'
		}
		if(attrs.year < 2000){
			console.log('lager than 2000')
			return 'year must be after 2000, realValue=' + attrs.year
		}
	},
	parse: function(response, xhr){ // save、fetchが実行された場合に適用される
		response.bookType = 'ebook'
		console.log('parse response')
		console.log(response)
		return response
	}
})

// validateにひっかかるとモデルはサーバーに渡されない
// そのため、error関数も実行されない
var sixBook = new SixBook({name: 'sixbookname', author: 'sixauthor', year: 2001})

sixBook.save(sixBook.attributes,
{
	success: function(model, response, options){
		console.log('model saved')
		console.log('id: ' + sixBook.get('id'))
		// console.log('saved model ↓')
		// console.log(model)
	},
	error: function(model, xhr, options){
		console.log('failed to save model')
	}
})

// モデルの取得
sixBook.fetch({
	success: function(model, response, options){
		console.log('fetch success')
		console.log('fetch model id:' + model.attributes[0].id) // 0を指定しているから上から削除されていく
	},
	error: function(model, response, options){
		console.log('fetch error')
	}
})

// モデルの削除
sixBook.destroy({
	success: function(model, response, options){
		console.log('destroy success')
	},
	error: function(model, response, options){
		console.log('destroy error')
	},
	wait: true // 成功したらクライアントのBackbone.collectionからもモデルが削除される
})

console.log('sixbook')
console.log(sixBook)


console.log('==================3.3 Backboneのコレクション==================')
// Bookに基づいてコレクションを定義
var Library = Backbone.Collection.extend({model: SixBook,
	initialize: function(){
		console.log('create library Collection')
	}
})

var mylibrary = new  Library()
console.log(mylibrary)


console.log('==================3.3.1 コンストラクタ==================')

var bookone = new SixBook({name: 'onename', author: 'oneauthor', year: 2001})
var booktwo = new SixBook({name: 'twoname', author: 'twoauthor', year: 2005})
var my2library = new Library([bookone, booktwo])
console.log('1: library contains ' + my2library.length + ' books.')



console.log('==================3.3.2 コレクションの操作==================')

// モデルの追加
var bookthree = new SixBook({name: 'threename', author: 'threeauthor', year: 2007})
my2library.add(bookthree)
console.log('2: library contains ' + my2library.length + ' books.')

var bookfour = new SixBook({name: 'fourname', author: 'fourauthor', year: 2010})
var bookfive = new SixBook({name: 'fivename', author: 'fiveauthor', year: 2010})

my2library.add([bookfour, bookfive])
console.log('3: library contains ' + my2library.length + ' books.')

bookone.set('year', 2014) // この時点でコレクションの中身も変わっている。参照を配列に入れているからか
console.log('year: ' + my2library.get(bookone).get('year'))
console.log('4: library contains ' + my2library.length + ' books.')
console.log('year: ' + my2library.get(bookone).get('year'))
my2library.add(bookone, {merge: true})
console.log('5: library contains ' + my2library.length + ' books.')

var booksix = new SixBook({name: 'sixname', author: 'sixauthor', year: 2012})
my2library.push(booksix)
console.log('6: library contains ' + my2library.length + ' books.')

var bookseven = new SixBook({name: 'sevenname', author: 'sevenauthor', year: 2012})
my2library.unshift(bookseven)
console.log('6: library contains ' + my2library.length + ' books.')
console.log(my2library)

// モデルの削除
my2library.remove(bookfive)
console.log('7: library contains ' + my2library.length + ' books.')
my2library.remove([bookone, booktwo])
console.log('8: library contains ' + my2library.length + ' books.')


var RemoveLibrary = Backbone.Collection.extend({model: SixBook,
	initialize: function(){
		console.log('create library Collection')
		this.on('remove', function(removedModel, models, options){
			console.log('element removed at: ' + options.index)
		})
	}
})

var my3library = new  RemoveLibrary([bookone, booktwo, bookthree, bookfour, bookfive, booksix, bookseven])
my3library.remove(booktwo)
my3library.pop()
my3library.shift()

// コレクションのリセット
console.log('9: library contains ' + my3library.length + ' books.')
my3library.reset([bookthree]) // 引数のモデルで置き換えられる。だから結果は１になる
console.log('10: library contains ' + my3library.length + ' books.')
my3library.reset()
console.log('11: library contains ' + my3library.length + ' books.')

// コレクションのスマートな更新
my4library = new  RemoveLibrary([bookone, booktwo])
console.log('12: library contains ' + my4library.length + ' books.')
my4library.set([booktwo], {remove: false})
console.log('13: library contains ' + my4library.length + ' books.')
my4library.set([booktwo])
console.log('13: library contains ' + my4library.length + ' books.') // bookoneが削除される

console.log('==================3.3.3 コレクションのトラバース==================')

// モデルの取得
var abook = my2library.get('c15')
console.log('book called ' + abook.get('name'))
var anotherbook = my2library.at(1)
console.log('book called ' + anotherbook.get('name'))

// コレクションのループ処理

// 単純なループ処理
for(var i=0;i<my2library.length;i++){
	var model = my2library.get(i)
	if(model) console.log('book is called ' + model.get('name'))
}

// underscoreのforeachを使用
my2library.forEach(function(model){
	console.log('1: for each book is called ' + model.get('name'))
})

console.log('==================3.3.4 その他のユーティリティメソッド==================')

// コレクションのソート

// コレクションをソートd
var sortedbyname = my2library.sortBy(function(book){
	return book.get('name')
})
console.log('sorted version: ')

sortedbyname.forEach(function(model){
	console.log('2: for each book is called ' + model.get('name'))
})


var SortedLibrary = Backbone.Collection.extend({model: SixBook,
	initialize: function(){
		console.log('create library Collection')
		this.on('remove', function(removedModel, models, options){
			console.log('element removed at: ' + options.index)
		})
	},
	comparator: function(a, b){
		return a.get('name') < b.get('name') ? -1 : 1
	}
})

var my5library = new  SortedLibrary([bookone, booktwo, bookthree, bookfour, bookfive, booksix, bookseven])
my5library.at(0).set('name', 'z')
my5library.forEach(function(model){
	console.log('3: for each book is called ' + model.get('name'))
})

// ソートを適用
my5library.sort()
my5library.forEach(function(model){
	console.log('4: for each book is called ' + model.get('name'))
})

// シャッフル
var shuffled = my5library.shuffle()
my5library.forEach(function(model){
	console.log('5: for each book is called ' + model.get('name'))
})

// 属性リストの取得
console.log('lit of authors in collection')
var authors = my5library.pluck('author')
authors.forEach(function(authroname){
	console.log('authorname ' + authroname)
})

// 検索
var results = my5library.where({author: 'sixauthor'})
console.log("found: " + results.length + ' match')

var result = my5library.findWhere({author: 'sixauthor'})
console.log("found: " + results.length + ' match')

var grouped = my5library.groupBy('year')
console.log(grouped)


console.log('==================3.3.5 サーバーとのデータ交換==================')

// セットアップ
var SeverLibrary = Backbone.Collection.extend({model: SixBook,
	url: 'http://localhost:8080/books/',
	initialize: function(){
		console.log('create library Collection')
		this.on('remove', function(removedModel, models, options){
			console.log('element removed at: ' + options.index)
		})
	},
	comparator: function(a, b){
		return a.get('name') < b.get('name') ? -1 : 1
	},
	parse: function(response, xhr){
		// カスタマイズ処理
		response.forEach(function(model){
			model.published = true
		})
		return response
	}
})

var myonlinelibrary = new SeverLibrary()
myonlinelibrary.fetch({
	success: function(e){
		console.log('got data...')
	},
	error: function(e){
		console.log('something went wrong...')
	}
})

// サーバーにデータを保存する

// モデルをコレクションに追加し、サーバーに保存
var savedbook = new SixBook({name: 'savedname', author: 'savedauthor', year: 2012})
console.log("===================")
console.log(savedbook)
myonlinelibrary.add(savedbook)
savedbook.save({
	success: function(e){
		console.log('book saved to server000000000000000000')
	},
	error: function(e){
		console.log('error saving book00000000000000000')
	}
})

// コレクションの追加とサーバーへの保存を一度に実行
myonlinelibrary.create(savedbook)

// サーバーからデータを削除する

savedbook.destroy({
	success: function(e){
		console.log('book deleted !!!!!!!!!!!!!!!!')
	},
	error: function(e){
		console.log('error deleting book!!!!!!!!!')
	}
})



