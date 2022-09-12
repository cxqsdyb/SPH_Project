<template>
  <div class="spec-preview">
    <!-- 原图 -->
    <img :src="skuImageList[currentIndex].imgUrl" ref="img" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大的区域 -->
    <div class="big">
      <img :src="skuImageList[currentIndex].imgUrl" ref="big" />
    </div>
    <!-- 绿色阴影，需要被放大的区域 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    // 处理mask
    // event不写也行！
    handler(event) {
      let mask = this.$refs.mask;
      let img = this.$refs.img;
      let big = this.$refs.big;
      // 获取鼠标位置,确认mask的left和top
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      // 限制边界
      if (left < 0) left = 0;
      if (left > img.offsetWidth - mask.offsetWidth) left = img.offsetWidth - mask.offsetWidth;
      if (top < 0) top = 0;
      if (top > img.offsetHeight - mask.offsetHeight) top = img.offsetHeight - mask.offsetHeight;
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      // 放大时默认左上角对齐，图片向左left为负，且放大两倍！
      big.style.left = -2 * left + 'px';
      big.style.top = -2 * top + 'px';
    }
  },
  // mounted中绑定事件！
  mounted() {
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index;
    })
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>