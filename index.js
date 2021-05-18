/*

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/

// Description
// In this exercise we explore a common scenario in eCommerce, adding and removing items from the cart, and calculating the total.

// Deliverables
// - A user can view a selection of items in the store
// - From the store, a user can add an item to their cart
// - From the cart, a user can view and adjust the number of items in their cart
//     - If an item's quantity equals zero it is removed from the cart
// - A user can view the current total in their cart

// Instructions
// - Use this template as a starting point => https://codesandbox.io/s/js-exercise-greengrocer-template-grqi6
// - Create a state object
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Taking HTML semantics into consideration, use a button when an action is happening on the same page





// - Create a state object

const state = {
  products:
    [
      {
        id: 1,
        name: "beetroot",
        img: String.raw`assets/icons/001-beetroot.svg`,
        price: 1.2
      },
      {
        id: 2,
        name: "carrot",
        img: String.raw`assets/icons/002-carrot.svg`,
        price: 1.4
      },
      {
        id: 3,
        name: "apple",
        img: String.raw`assets/icons/003-apple.svg`,
        price: 2.2
      },
      {
        id: 4,
        name: "apricot",
        img: String.raw`assets/icons/004-apricot.svg`,
        price: 0.6
      },
      {
        id: 5,
        name: "avocado",
        img: String.raw`assets/icons/005-avocado.svg`,
        price: 0.8
      },
      {
        id: 6,
        name: "bananas",
        img: String.raw`assets/icons/006-bananas.svg`,
        price: 1.3
      },
      {
        id: 7,
        name: "bell-pepper",
        img: String.raw`assets/icons/007-bell-pepper.svg`,
        price: 1.7
      },
      {
        id: 8,
        name: "berry",
        img: String.raw`assets/icons/008-berry.svg`,
        price: 1.4
      },
      {
        id: 9,
        name: "blueberry",
        img: String.raw`assets/icons/009-blueberry.svg`,
        price: 1.2
      },
      {
        id: 10,
        name: "eggplant",
        img: "assets/icons/010-eggplant.svg",
        price: 1.8
      }
    ],

  inCart: []
}


const itemList = document.querySelector(".item-list.store--item-list")
const cartList = document.querySelector(".item-list.cart--item-list")
const totalNumber = document.querySelector(".total-number")


function renderProducts() {
  for (const fruit of state.products) {
    const listEl = createListEl(fruit)
    itemList.append(listEl)
  }
}




// input: productItem
// action: add any cart items to cart/add one to the quantity in cart
// output: undefined
function addProductToCart(productItem) {
  // check if productItem is in the cart

  const foundItem = state.inCart.find(function (cartItem) {
    return productItem.id === cartItem.productId
  })
  if (foundItem) {
    ++foundItem.quantity
    foundItem.productPrice = foundItem.quantity * productItem.price
  } else {
    const inCartInfo = {
      productId: productItem.id,
      quantity: 1,
      productPrice: productItem.price,
      name: productItem.name,
      img: productItem.img
    }
    state.inCart.push(inCartInfo)
  }

  // if the item is in the cart increase quantity by one
  // otherwise add the item to the cart

  // let productIsInCart = false

  // for (const product of state.inCart) {
  //   if (product.productId === productItem.id) {
  //     productIsInCart = true
  //     ++product.quantity
  //     product.productPrice = product.quantity * productItem.price
  //   }
  // }
  // if (!productIsInCart) {
  //   state.inCart.push(inCartInfo)
  // }

}


function createListEl(item) {
  const listEl = document.createElement("li")
  const imgEl = document.createElement("img")
  imgEl.setAttribute("src", item.img)
  imgEl.setAttribute("alt", item.name)
  const cartBtn = document.createElement("button")
  cartBtn.innerText = `Add to Basket`



  listEl.append(imgEl, cartBtn)

  cartBtn.addEventListener("click", function () {
    addProductToCart(item)
    createCartItems()
    renderTotal()
    console.log("cart list:", state.inCart)
  })
  return listEl
}


function createCartItem(item) {
  const listCartEl = document.createElement("li")
  const imgCartEl = document.createElement("img")
  imgCartEl.setAttribute("class", "cart--item-icon")
  imgCartEl.setAttribute("src", item.img)
  imgCartEl.setAttribute("alt", item.name)
  const pCartEl = document.createElement("p")
  pCartEl.innerText = item.name

  const minusBtn = document.createElement("button")
  minusBtn.setAttribute("class", "quantity-btn remove-btn center")
  minusBtn.innerText = "-"
  minusBtn.addEventListener("click", function () {
    decreaseQuantity(item)
    console.log("In Cart:", state.inCart)
  })


  const spanCartEl = document.createElement("span")
  spanCartEl.setAttribute("class", "quantity-text center")
  spanCartEl.innerText = item.quantity
  const plusBtn = document.createElement("button")
  plusBtn.setAttribute("class", "quantity-btn add-btn center")
  plusBtn.innerText = "+"
  plusBtn.addEventListener("click", function () {
    const singlePrice = item.productPrice / item.quantity
    item.quantity++
    spanCartEl.innerText = item.quantity
    item.productPrice = singlePrice * item.quantity
    renderTotal()
  })

  listCartEl.append(imgCartEl, pCartEl, minusBtn, spanCartEl, plusBtn)

  return listCartEl
}

function createCartItems() {
  cartList.innerHTML = ""
  for (const item of state.inCart) {
    const listCartEl = createCartItem(item)
    cartList.append(listCartEl)
  }
}

function renderTotal() {
  let totalPrice = 0
  for (const cartItem of state.inCart) {
    totalPrice += cartItem.productPrice
  }
  totalNumber.innerText = `£${totalPrice.toFixed(2)}`
  console.log("total price:", totalPrice)
}

function decreaseQuantity(item) {
  const singlePrice = item.productPrice / item.quantity
  item.quantity--
  if (item.quantity === 0) {
    const indexToDelete = state.inCart.findIndex(function (cartItem) {
      return item.productId === cartItem.productId
    })
    state.inCart.splice(indexToDelete, 1)
  } else {
    item.productPrice = singlePrice * item.quantity
  }
  createCartItems()
  renderTotal()
}

function increaseQuantity(item) {
  const singlePrice = item.productPrice / item.quantity
  item.quantity++
  spanCartEl.innerText = item.quantity
  item.productPrice = singlePrice * item.quantity
  renderTotal()
}

renderProducts()
renderTotal()