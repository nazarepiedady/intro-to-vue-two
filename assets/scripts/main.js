var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: 'assets/images/greensocks.png',
    inventory: 8,
    details: [
      '80% cotton',
      '20% polyester',
      'Gender-neutral'
    ],
    variants: [
      {
        id: 2234,
        color: 'green',
        image: 'assets/images/greensocks.png'
      },
      {
        id: 2235,
        color: 'blue',
        image: 'assets/images/bluesocks.png'
      }
    ],
    cart: 0
  },
  methods: {
    capitalize(string) {
      return string[0].toUpperCase() + string.slice(1)
    },
    addToCart() {
      this.cart += 1
    },
    updateProductImage(imagePath) {
      this.image = imagePath
    },
    removeFromCart() {
      this.cart = this.cart > 0 ? this.cart - 1 : 0
    }
  }
})