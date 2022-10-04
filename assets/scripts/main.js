var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    image: 'assets/images/greensocks.png',
    inStock: false,
    details: [
      '80% cotton',
      '20% polyester',
      'Gender-neutral'
    ],
    variants: [
      {
        id: 2234,
        color: '#2cb67d',
        image: 'assets/images/greensocks.png'
      },
      {
        id: 2235,
        color: '#232946',
        image: 'assets/images/bluesocks.png'
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProductImage(imagePath) {
      this.image = imagePath
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`
    },
  }
})