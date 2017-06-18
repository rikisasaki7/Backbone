// ==================3.2 Backboneのモデル==================
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

// ==================3.2.2 モデルの属性==================
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
                       // nameにはデフォルト値がセットされることに注意

// ==================3.2.3 モデルに関数を追加する==================
