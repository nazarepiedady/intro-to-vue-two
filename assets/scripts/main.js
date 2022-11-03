var eventBus = new Vue()

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

      <product-tabs :reviews="reviews"></product-tabs>
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
  },
  mounted() {
    eventBus.$on('submit-review', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="sendForm">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

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
        eventBus.$emit('submit-review', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        this.errors = []
        if (!this.name) this.errors.push('Name is required.')
        if (!this.review) this.errors.push('Review is required.')
        if (!this.rating) this.errors.push('Rating is required.')
      }
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab">
        {{ tab }}
      </span>

      <div v-show="selectedTab == 'Reviews'">
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

      <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
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