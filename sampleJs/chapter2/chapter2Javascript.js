// chapter2 javascript基本構文など
// String
var doubleQuoteString = "A String in double quotes";
var escapedQuote = 'He sail \'hello\'';
console.log(doubleQuoteString)
console.log(escapedQuote)

// Number
var count = 10
var cost = 2.99
var pi = 123e5
console.log(count)
console.log(cost)
console.log(pi)

// Boolean
var lightsOn = true
console.log(lightsOn)

// UndefinedとNull
var initialVariable
console.log(initialVariable)
initialVariable = 'hello'
initialVariable = null
console.log(initialVariable)

// Date
var now = new Date()
console.log(now)
var calendarString = now.toDateString()
var time = now.toTimeString()
console.log(calendarString)
console.log(time)

// Math
var doubleValue = 2.123
var intValue = Math.ceil(doubleValue)
console.log(doubleValue)
console.log(intValue)

// RegExp
var pattern = new RegExp('javascript', 'i')
var pattern2 = /javascript/i
console.log(pattern)
console.log(pattern2)

var myString = 'I love Javascript'
var match = myString.match(pattern)
console.log(match)

// if
var userInput = "run"
if(userInput === 'run'){
	console.log('running application')
}
var price = 11
var outputString = (price < 10) ? 'Reasonable' : 'Too expensive'
console.log(outputString)

// roop
for(var i = 2; i >= 0; i--){
	console.log(i + 'iiiii')
}

var count = 0
while(count < 3){
	console.log(count)
	count++
}

do{
	console.log(count)
	count++
} while(count < 5)

// 配列
var myArray = []
myArray[0] = 'first item'
myArray.push('second item')
var myArray2 = new Array('first item', 'second item', 3)

console.log(myArray)
console.log(myArray2)
console.log(myArray2.valueOf()) // プリミティブ値

console.log("===========closer================")

// closer
function calculateArea(height, width, shape) {
	var pi = Math.PI

	// ひとつめのクロージャ
	function getCircleArea(){
		var area = pi*(height*height)
		return area
	}

	// ふたつめのクロージャ
	function getRectangleArea(){
		var area = width * height
		return area
	}

	if(shape === 'Circle'){
		return getCircleArea()
	} else{
		return getRectangleArea()
	}
}

console.log("calculateArea")
console.log(calculateArea(10, 5, 'Circle'))


console.log("===========オブジェクト指向================")


// javascriptとオブジェクト指向
var myObject = new Object()
myObject.id = 100
var myObject2 = {id: 100}
console.log(myObject)
console.log(myObject2)
console.log(myObject2.id)

console.log("===========カプセル化================")



// コンストラクタ・メソッド・カプセル化
// コンストラクタ定義
function Message(subject, recipient, content) {
	this.subject = subject
	this.recipient = recipient
	this.content = content
	// メソッドを公開
	this.showMessage = showMessage
	function showMessage() {
		console.log('To:' + recipient + ' Subject:' + subject + ' content:' + content)
	}
	}

var myEmail = new Message('subject', 'recipient', 'content')
console.log(myEmail)
myEmail.showMessage()

// メソッド これでも公開されているっぽい
Message.prototype.showPrototype = function(){
	console.log ('showPrototype')
}

var myEmail2 = new Message('subject', 'recipient', 'content')
myEmail2.showPrototype()

// カプセル化
Message.prototype = {
	constructor: Message,

	sendMessage: function(){
		console.log('Sending message to' + this.recipient)
	},

	show: function() {
		console.log('prototype.show  To:' + this.recipient + ' Subject:' + this.subject + ' content:' + this.content)
	}
}

var workMessage = new Message('Work complete', 'boss@mycorp.com', 'My work is done here')
var socialMessage = new Message('Time to go out', 'friend@gmail.com', 'Finished work now')
workMessage.sendMessage()
socialMessage.sendMessage()
console.log("show")
socialMessage.show()
// ↓はprototypeを上書きしてしまっているので、実行不可
// socialMessage.showPrototype()

console.log("===========プロトタイプを使った継承================")


// プロトタイプを使った継承
function Animal(name){
	console.log("Animal constructor")
	this.name = name
}

Animal.prototype.talk = function(){
	console.log("Animal.prototype.talk: " + this.phrase) // Dogオブジェクトでない場合、undefinedになる
	console.log("Animal.prototype.talk: " + this.name) // Animalオブジェクトでない場合、undefinedになる
}

var cat = new Animal("Cat")
cat.talk()

function Dog(phrase){
	console.log("Dog constructor")
	this.phrase = phrase
	// 親のコンストラクタを使用する
	// this.constructor('Dog')  // 継承の方法①
}

// 継承する
// Dog.prototype = new Animal()  // 継承の方法②
// Dog.prototype.constructor = Dog
var myDog = new Dog('bow')
// myDog.talk()

// メソッドのオーバーライド
Dog.prototype.talk = function(){
	console.log('The dog says')
	Animal.prototype.talk.call(this)
}

// Dog.prototype.parent = Animal.prototype  // 継承の方法③
// Dog.prototype.talk = function(){
// 	console.log('The dog says')
// 	// parentプロパティを使ってメソッドを呼び出す
// 	this.parent.talk.call(this)
// }

myDog.talk() // 親クラスを指定しなくてもcallを使用すれば継承元とみなしてメソッド呼び出しがされる

// プロトタイプチェーン
console.log(myDog.toString())

// ■Parastic Combination Inheritance ぱたーん ぐぐってみたら継承はこれでやれと書いてあった
// Object.createメソッド
var dog = Object.create(Animal.prototype, {
	'legs': {value: 4, writeable: true},
	'barks': {value: true, writeable: false}
})
console.log(dog)

// inheritPrototype関数 ーー継承用に作った独自関数
function inheritPrototype(childObject, parentObject){
	var parentCopy = Object.create(parentObject.prototype)
	parentCopy.constructor = childObject
	childObject.prototype = parentCopy
}

// DogにAnimalを継承させる
inheritPrototype(Dog, Animal)



console.log("===========メソッドとプロパティへのアクセスの制御================")

function PrivateMessage(subject, recipient, content){
	// プライベートプロパティ
	var privateKey = 111
	// プライベートメソッド
	function encryptMessage(content){
		return content || privateKey
	}

	this.subject = subject
	this.recipient = recipient
	this.content = content

	// メソッドを公開
	this.showMessagePublic = showMessage
	function showMessage(){
		console.log('privateMessage.showMessage  to:' + recipient + ', subject:' + subject + ', content' + content)
	}

	// プライベートメソッドを使用するパブリックメソッド
	this.sendMessagePublic = sendMessage
	function sendMessage(){
		console.log("privateMessage.sendMessage  " + encryptMessage(this.content))
	}
}

var privateMessage = new PrivateMessage('ttt', 'rrrr', 'cccc')
privateMessage.showMessagePublic()
privateMessage.sendMessagePublic()


console.log("===========名前空間の提供================")

var com  = com || {}
com.appress = com.apress || {}
com.appress.chapterone = com.appress.chapterone || {}
com.appress.chapterone.NameSpaceMessage = function NameSpaceMessage(){

}
console.log(new com.appress.chapterone.NameSpaceMessage())

