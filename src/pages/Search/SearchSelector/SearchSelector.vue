<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li v-for="brand in trademarkList" :key="brand.tmId" @click="tradeHandler(brand)">
            {{ brand.tmName }}
          </li>
        </ul>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <!-- 属性列表 属性名--多个属性值 -->
      <div class="fl key">
        <!-- 属性名 -->
        {{ attr.attrName }}
      </div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 多个属性值 -->
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
            <a @click="attrInfo(attr.attrId, attrValue, attr.attrName)">
              {{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchSelector',
  computed: {
    // attrsList:商品属性列表
    // trademarkList:商品品牌列表
    ...mapGetters(['attrsList', 'trademarkList']),
  },
  methods: {
    // 品牌点击处理,向服务器请求品牌
    // 需要先把点击的内容传给父组件，由父组件来请求！
    // 为什么？父组件有searchData参数！需要给服务器传searchData！
    // 子传父，自定义事件！
    tradeHandler(arg) {
      this.$emit('tradeMarkInfo', arg)
    },
    // 点击属性值的响应函数
    // 发送属性请求需要三个参数：id、value、key
    attrInfo(id, value, key) {
      // 子传父！
      this.$emit('attrInfo', id, value, key);
    }
  },
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>