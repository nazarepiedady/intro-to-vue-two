Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image">
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else>Out of stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" :key="variant.id"
             class="color-box"
             :style="{ backgroundColor: variant.color }"
             @mouseover="updateProductImage(index)">
        </div>

        <button @click="addToProductCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">
          Add to Cart
        </button>
      </div>
    </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
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
      ]
    }
  },
  methods: {
    addToProductCart() {
      this.$emit('add-to-cart')
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
      let image = this.variants[this.selectedVariant].image
      return image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: 0
  },
  methods: {
    updateCart() {
      this.cart += 1
    }
  }
})