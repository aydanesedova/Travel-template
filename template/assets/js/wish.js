const myDiv = document.getElementById("wishProducts")

function getWish() {
    myDiv.innerHTML = ``
    let cart = JSON.parse(localStorage.getItem("wishList")) || []
    console.log(cart);
    cart.map((item, index) => {
        let box = document.createElement("div")
        box.className = "box"
        box.innerHTML = `
                <img src="${item.image}" alt="">
                <p>${item.title}</p>
                <button onclick="removeWish(${index})">Remove from cart</button>`
        myDiv.appendChild(box)
    })

}

function removeWish(index) {
    let cart = JSON.parse(localStorage.getItem("wishList"))
    cart.splice(index, 1)
    localStorage.setItem("wishList", JSON.stringify(cart))
    getWish()

}
getWish()

window.onload = () => {
    getWish()
}


