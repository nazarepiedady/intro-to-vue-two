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
    sizes: [
      {
        id: 0,
        value: 'sm'
      },
      {
        id: 0,
        value: 'md'
      },
      {
        id: 0,
        value: 'lg'
      }
    ]
  },
  methods: {
    capitalize(string) {
      return string[0].toUpperCase() + string.slice(1)
    }
  }
})