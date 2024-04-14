<template>
  <HeaderC></HeaderC>
  <div
    class="position-fixed top-0 end-0 p-3"
    style="z-index: 11; top: 65px !important"
  >
    <TC ref="TToast" :message="ToastMessage" :bgClass="ToastType"></TC>
  </div>
  <div class="container">
    <div class="container mt-5">
      <div class="row">
        <breadCrumbsComponent
          :breadcrumbs="[{ path: '/', title: 'Home' }]"
        ></breadCrumbsComponent>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h2>Our latest Activity</h2>
          <SwiperC></SwiperC>
        </div>
        <div class="col-md-6">
          <h2>Watch People Shop</h2>
          <MapC style="width: 100%; height: 400px"></MapC>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row">
          <div class="col">
            <div class="row justify-content-center py-7">
              <div class="col-md-6 text-center">
                <h3 class="mb-5">
                  <strong> The Essence of Reading </strong>
                </h3>
                <figure>
                  <blockquote class="blockquote d-flex align-items-center">
                    <div class="pe-3">
                      <img
                        src="/LW.jpg"
                        style="
                          object-fit: cover;
                          width: 100px;
                          height: 100px;
                          border-radius: 50%;
                        "
                        alt=""
                      />
                    </div>
                    <p class="mb-0">
                      Die Grenzen meiner Sprache sind die Grenzen meiner Welt
                    </p>
                  </blockquote>
                  <figcaption class="blockquote-footer ps-9">
                    Ludwig Wittgenstein in
                    <cite title="Source Title"
                      >Logisch-philosophische Abhandlung</cite
                    >
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row mb-5"><h2>Bestselling Books</h2></div>
        <div class="row">
          <div class="col-lg-6 d-flex align-items-center">
            <div class="text-center w-100">
              <h4>The Inheritance Cycle</h4>
              <p style="line-height: 2rem">
                <strong>The Inheritance Cycle</strong> by Christopher Paolini
                narrates Eragon and Saphira's battle against the tyrant
                Galbatorix. A captivating journey of magic, struggle, and
                alliance unfolds in Alagaësia, enthralling readers with its rich
                storytelling and vivid world.
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <img
              style="object-fit: cover"
              src="/Bookset1.jpg"
              alt="Bestselling Books"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <img
              style="object-fit: cover"
              src="/Bookset3.png"
              alt="Lorem ipsum"
              class="img-fluid"
            />
          </div>
          <div class="col-lg-6 d-flex align-items-center">
            <div class="text-center w-100 mt-2">
              <h4>The Blue Ant trilogy</h4>
              <p style="line-height: 2rem">
                <strong>The Blue Ant trilogy</strong> is a series of science
                fiction novels by William Gibson. The novels are Pattern
                Recognition (2003), Spook Country (2007), and Zero History
                (2010). The trilogy follows the lives of a group of characters
                who are drawn into a world of corporate espionage, terrorism,
                and cybercrime.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 d-flex align-items-center mt-5">
            <div class="text-center w-100">
              <h4>The Old Kingdom Chronicles</h4>
              <p style="line-height: 2rem">
                <strong>The Old Kingdom Chronicles</strong> is a series of
                fantasy novels by Garth Nix. The series follows the adventures
                of Sabriel, Lirael, and Abhorsen as they fight to protect the
                Old Kingdom from evil forces.
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <img
              style="object-fit: cover"
              src="/Bookset3.jpg"
              alt="Bestselling Books"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <h2>Exclusive Discounts</h2>
          <div class="row">
            <div class="col-md-6 mt-3">
              <div class="coupon-card p-4">
                <h4 class="coupon-title">20% Off Coupon</h4>
                <div
                  style="
                    margin-top: 24px;
                    margin-bottom: 24px;
                    width: 100%;
                    height: 400px;
                    overflow: hidden;
                    position: relative;
                  "
                >
                  <img
                    src="/20Percent.jpg"
                    alt="20% coupon image"
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                </div>

                <p>
                  Use code <strong>Reading</strong> at checkout to get 20% off
                  your purchase!
                </p>
                <p>
                  Explore a wide range of books and let your imagination soar.
                  Limited time offer.
                </p>
                <div class="d-flex justify-content-center mt-5">
                  <button
                    type="button"
                    @click="copyToClipboard('Reading')"
                    class="btn btn-primary"
                  >
                    Copy the Code
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-3">
              <div class="coupon-card p-4">
                <h4 class="coupon-title">50% Off Coupon</h4>
                <div
                  style="
                    margin-top: 24px;
                    margin-bottom: 24px;
                    width: 100%;
                    height: 400px;
                    overflow: hidden;
                    position: relative;
                  "
                >
                  <img
                    src="/50Percent.jpg"
                    alt=""
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                </div>
                <p>
                  Use code <strong>Literature</strong> at checkout to get 50%
                  off your purchase!
                </p>
                <p>
                  Dive into the world of literature with our special selection.
                  Grab this deal before it's gone!
                </p>
                <div class="d-flex justify-content-center mt-5">
                  <button
                    type="button"
                    @click="copyToClipboard('Literature')"
                    class="btn btn-primary"
                  >
                    Copy the Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapC from '../components/MapComponent.vue';
import SwiperC from '../components/SwiperComponent.vue';
import HeaderC from '../components/HeaderComponent.vue';
import TC from '../components/toastComponent.vue';
import breadCrumbsComponent from '../components/breadCrumbsComponent.vue';

export default {
  data() {
    return {
      orderID: '',
      checkoutData: '',
      ToastMessage: '',
      ToastType: '',
    };
  },
  components: {
    TC,
    MapC,
    SwiperC,
    HeaderC,
    breadCrumbsComponent,
  },
  methods: {
    handleShowToast(data) {
      this.ToastMessage = data.message;
      this.ToastType = data.bgClass;
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.ToastType = text === 'Reading' ? 'bg-info' : 'bg-primary';
        this.ToastMessage = `${text} has been copied to clipboard!`;
        this.$nextTick(() => {
          if (this.$refs.TToast) {
            this.$refs.TToast.showToast();
          }
        });
      } catch (err) {
        this.ToastType = 'bg-danger';
        this.$nextTick(() => {
          if (this.$refs.TToast) {
            this.$refs.TToast.showToast();
          }
        });
      }
    },
  },
};
</script>
