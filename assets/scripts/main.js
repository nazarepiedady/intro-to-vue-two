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
        color: 'green'
      },
      {
        id: 2235,
        color: 'blue'
      }
    ],
    cart: 0
  },
  methods: {
    capitalize(string) {
      return string[0].toUpperCase() + string.slice(1)
    }
  }
})