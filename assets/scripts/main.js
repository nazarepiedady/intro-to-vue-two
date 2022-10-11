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

      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="review in reviews">
            <h3>{{ review.name }}</h3>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>

      <product-review @submit-review="addProductReview"></product-review>
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
      ],
      reviews: []
    }
  },
  methods: {
    addToProductCart() {
      let id = this.variants[this.selectedVariant].id
      this.$emit('add-to-cart', id)
    },
    updateProductImage(index) {
      this.selectedVariant = index
    },
    addProductReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    title() {
      let heading = `${this.brand} ${this.product}`
      return heading
    },
    image() {
      let image = this.variants[this.selectedVariant].image
      return image
    },
    inStock() {
      let isInStock = this.variants[this.selectedVariant].quantity
      return isInStock
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="sendForm">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    sendForm() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name:   this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('submit-review', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else if (!this.name) {
        this.errors.push('Name is required.')
      } else if (!this.review) {
        this.errors.push('Review is required.')
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(productId) {
      this.cart.push(productId)
    }
  },
  computed: {
    cartLength() {
      let length = this.cart.length
      return length
    }
  }
})