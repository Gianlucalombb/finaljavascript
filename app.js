let productos = []
let carrito = []


fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data
    mostrarProductos(productos)
  })


function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos")
  contenedor.innerHTML = ""

  lista.forEach(prod => {
    contenedor.innerHTML += `
      <div>
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
      </div>
    `
  })
}


function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id)
  carrito.push(producto)
  actualizarCarrito()

  Swal.fire({
    title: "Agregado al carrito",
    text: producto.nombre,
    icon: "success"
  })
}


function actualizarCarrito() {
  const cont = document.getElementById("carrito")

  cont.innerHTML = ""

  carrito.forEach(prod => {
    cont.innerHTML += `<p>${prod.nombre} - $${prod.precio}</p>`
  })

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0)

  cont.innerHTML += `<strong>Total: $${total}</strong>`
}


function comprar() {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío")
    return
  }

  Swal.fire({
    title: "Compra realizada",
    text: "Gracias por tu compra",
    icon: "success"
  })

  carrito = []
  actualizarCarrito()
}