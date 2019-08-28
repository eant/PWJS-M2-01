class Producto {
	//1) Constructor
	constructor(n, s, p, d = false){

		this._nombre = n
		this._stock = s
		this._precio = p
		this._disponible = d
		this._vDOM = document.createElement("ul")
		this._anexado = false
	}
	//2) Getters y Setters

	get nombre(){
		return this._nombre
	}

	set nombre(value){
		if( value == "" || value == null || value == undefined || !isNaN(value) ){
			alert("Error, nombre invalido. Indicar solamente caracteres alfanumericos")
		} else {
			this._nombre = value
		}
	}

	get stock(){
		return this._stock
	}

	set stock(value){

		if( Number.isInteger(value) ){
			this._stock = value
		} else {
			alert("Error, stock invalido. Indicar solamente num. enteros")
		}
	}

	get precio(){
		return (this._precio * 1.21).toFixed(2)
	}

	set precio(value){

		if( isNaN(value) ){
			alert("Error, precio invalido. Indicar solamente numeros")
		} else {
			this._precio = value
		}
	}

	get disponible(){
		return this._disponible
	}

	set disponible(value){

		if( typeof value !== "boolean" ){

			alert("Error, disponibilidad invalida. Ingrese solo true/false")

		} else {
			this._disponible = value
		}

	}

	//3) Metodos de Instancia
	Mostrar(area){
		//debugger
		//window.document.write(`<p>Hay ${this._stock} unidades de ${this._nombre} que valen ARS ${this._precio}</p>`)

		//let ficha = document.createElement("ul")

		let datos = `<li>Nombre: ${this._nombre}</li>
					 <li>Stock: ${this._stock} unid.</li>
					 <li>Precio: ARS ${this._precio}</li>
					 <li>Disponible: ${this._disponible}</li>
					 <button>Actualizar</button>`

		this._vDOM.innerHTML = datos

		this._vDOM.querySelector("button").onclick = () => {
			this.nombre = prompt("Ingrese nuevo nombre:")
			this.stock = parseInt( prompt("Ingrese nuevo stock:") )
			this.precio = prompt("Ingrese nuevo precio")
			this.disponible = confirm("Esta disponible para la venta?")

			// Forzar el (re) renderizado del vDOM
			this.Mostrar(area)
		}

		this._vDOM.type = "square"
		this._vDOM.style.fontFamily = "Tahoma"

		if( !this._anexado ){
			document.querySelector(area).appendChild( this._vDOM )
			this._anexado = true
		}

	}

	//4) Metodos de Clase
	static Comparar(p1, p2){

		if( p1._precio > p2._precio ){
			document.write(`El ${p1._nombre} es mas caro que el ${p2._nombre}`)
		} else {
			document.write(`El ${p1._nombre} es mas barato que el ${p2._nombre}`)
		}

	}

	static parse(rta){

		let datos = JSON.parse(rta)

		//1) Si es un Array de Object...
		if( datos instanceof Array ){

			return datos.map( item => new Producto(item.nombre, item.stock, item.precio, item.disponible) )

		} else if( datos instanceof Object ){ //2) Si es un solo Object...

			return new Producto(datos.nombre, datos.stock, datos.precio, datos.disponible)

		} else { //3) Si no es ni Array ni Object...
			throw "ERROR: datos no compatibles para crear objetos Producto"
		}

	}
}