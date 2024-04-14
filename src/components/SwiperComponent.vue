<template>
  <div>
    <swiper
      :slides-per-view="1"
      :space-between="50"
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 2500,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide>
        <img
          loop
          src="/poster1.jpg"
          alt="ad image about black friday sale"
        />
        <div class="text-overlay">Incoming Big Sale!</div>

      </swiper-slide>
      <swiper-slide>
        <img
          loop
          src="/poster2.jpg"
          alt="ad image about reading field trip"
        />
        <div class="text-overlay">Join Us on Reading Fieldtrip!</div>

      </swiper-slide>
      <swiper-slide>
        <img
          loop
          src="/poster3.jpg"
          alt="ad image about meeting author"
        />
        <div class="text-overlay">Meet your Favorite Author!</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default {
  data() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 400px;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-overlay {
  position: absolute;
  bottom: 25px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 20px; /* 根據需要調整 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  padding: 10px 0; /* 上下邊距 */
}
.swiper-slide {
  position: relative; /* 為了 text-overlay 的絕對定位 */
}
</style>
