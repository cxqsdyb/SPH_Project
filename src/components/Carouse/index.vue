<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="MySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouse in Data" :key="carouse.id">
        <img :src="carouse.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'MyCarouse',
  props: ['Data'],
  watch: {
    Data: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.MySwiper, {
            // direction: 'vertical', // 垂直切换选项,默认水平
            loop: true, // 循环模式选项
            autoplay: true,//自动播放
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 点下面小球切换！
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      }
    }
  }
}
</script>

<style>
</style>