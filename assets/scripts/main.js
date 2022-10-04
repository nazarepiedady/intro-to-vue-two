var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    selectedVariant: 0,
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
        image: 'assets/images/greensocks.png',
        quantity: 10
      },
      {
        id: 2235,
        color: '#232946',
        image: 'assets/images/bluesocks.png',
        quantity: 0
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProductImage(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
  }
})