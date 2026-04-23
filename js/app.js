let productos = []
let carrito = []

document.addEventListener("DOMContentLoaded", () => {

  fetch("../data/productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data
      mostrarProductos(productos)
    })

  document.getElementById("btnComprar")
    .addEventListener("click", finalizarCompra)
})

function mostrarProductos(lista) {
  const cont = document.getElementById("productos")
  cont.innerHTML = ""

  lista.forEach(prod => {
    const div = document.createElement("div")
    div.classList.add("card")

    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <button>Agregar</button>
    `

    div.querySelector("button")
      .addEventListener("click", () => agregarAlCarrito(prod.id))

    cont.appendChild(div)
  })
}

function agregarAlCarrito(id) {
  const prod = productos.find(p => p.id === id)
  const existe = carrito.find(p => p.id === id)

  if (existe) {
    existe.cantidad++
  } else {
    carrito.push({ ...prod, cantidad: 1 })
  }

  actualizarCarrito()

  Swal.fire("Agregado al carrito")
}

function cambiarCantidad(id, cambio) {
  const prod = carrito.find(p => p.id === id)

  prod.cantidad += cambio

  if (prod.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id)
  }

  actualizarCarrito()
}

function actualizarCarrito() {
  const cont = document.getElementById("carrito")
  cont.innerHTML = ""

  carrito.forEach(prod => {
    const div = document.createElement("div")

    div.innerHTML = `
      ${prod.nombre} - $${prod.precio} x ${prod.cantidad}
      <button>+</button>
      <button>-</button>
    `

    const botones = div.querySelectorAll("button")

    botones[0].addEventListener("click", () => cambiarCantidad(prod.id, 1))
    botones[1].addEventListener("click", () => cambiarCantidad(prod.id, -1))

    cont.appendChild(div)
  })

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  const totalEl = document.createElement("h3")
  totalEl.textContent = "Total: $" + total

  cont.appendChild(totalEl)
}

function finalizarCompra() {
  const nombre = document.getElementById("nombre").value
  const email = document.getElementById("email").value

  if (!nombre || !email) {
    Swal.fire("Completá los datos")
    return
  }

  if (carrito.length === 0) {
    Swal.fire("Carrito vacío")
    return
  }

  Swal.fire(`Gracias ${nombre}, compra realizada`)

  carrito = []
  actualizarCarrito()
}