<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imgs, index) in skuImageList"
        :key="index"
      >
        <img
          :src="imgs.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0,

    }
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
      // 通知放大镜显示当前点击的图片！
      this.$bus.$emit('getIndex', this.currentIndex);
    }
  },
  // watch确保接收到数据
  watch: {
    skuImageList(newVal, oldVal) {
      //  this.$nextTick确保数据被渲染为真实DOM！
      this.$nextTick(() => {
        // 此时使用轮播图swiper！
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // 一页显示几个图片设置
          slidesPerView : 5,
          // 每次切换tu
          slidesPerGroup : 1,
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 415px;
  box-sizing: border-box;
  padding: 0 0px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 10px;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>