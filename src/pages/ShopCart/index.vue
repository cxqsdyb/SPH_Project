<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="goods in shopCartList" :key="goods.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="goods.isChecked == 1"
              @change="updateChecked(goods.skuId, goods.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="goods.imgUrl" />
            <div class="item-msg">
              {{ goods.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ goods.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum('btn', goods, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="goods.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('input', goods, $event.target.value)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum('btn', goods, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ goods.skuNum * goods.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoods(goods.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && shopCartList.length > 0"
          @change="changeAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteALLChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="toTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入节流函数
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(['shopCartInfo']),
    // 商品列表
    shopCartList() {
      return this.shopCartInfo.cartInfoList || []
    },
    // 所有商品总价
    totalPrice() {
      let sum = 0;
      this.shopCartList.forEach(element => {
        if (element.isChecked) {
          sum += element.skuNum * element.skuPrice;
        }

      });
      return sum
    },
    // 判断全选是否勾选
    isAllChecked() {
      return this.shopCartList.every(item => item.isChecked == 1);
    },
    // 判断选择的商品数量
  },
  methods: {
    // 请求数据,实现页面数据更新！
    getData() {
      this.$store.dispatch('getShopCartList');
    },
    // 更改商品数量
    changeNum:
      throttle(async function (mode, goods, num) {
        // console.log(mode,skuId,num);
        let skuNum = 0;
        let skuId = goods.skuId;
        if (mode == 'btn') {
          // 如果是+1，或原数量>1并-1
          if (num > 0 || (num < 0 && goods.skuNum > 1)) {
            skuNum = num;
            // 若原数量小于等于1且减1,不修改！最小为1！
          } else {
            skuNum = 0;
          }
          // 通过输入框修改数量！对用户输入合法性进行检测！
        } else {
          // 如果输入不是数字！
          if (isNaN(num * 1)) {
            skuNum = 0;
            alert('输入非法！')
          } else {
            // parseInt是为了避免小数！
            skuNum = parseInt(num) - goods.skuNum;
          }

          if (num < 1) {
            skuNum = 0;
            alert('最小数量为1！')
          }
        }
        try {
          await this.$store.dispatch('UpdateShopCart', { skuId, skuNum });
          // 获取更新后的购物车数据
          this.getData();
        } catch (error) {

        }
      }, 1000),

    // 删除商品
    async deleteGoods(skuId) {
      try {
        let result = await this.$store.dispatch('getDeleteGoods', skuId);
        alert(result);
      } catch (error) {
        alert(error);
      }
      // 删除完了更新数据
      this.getData();
    },
    // 更改商品勾选状态
    updateChecked: throttle(async function (skuId, isChecked) {
      isChecked = isChecked == 1 ? '0' : '1';
      try {
        await this.$store.dispatch('reqChangeIsChecked', { skuId, isChecked });
      } catch (error) {
        alert('请求失败！');
      }
      // 更新数据
      this.getData();
    }, 1000),

    // 删除全部已经勾选的商品，不用传参
    deleteALLChecked: throttle(async function () {
      try {
        await this.$store.dispatch('deleteALLCheckedGoods')
        alert('删除成功!');
      } catch (error) {
        alert('删除失败!');
      }
      this.getData();//更新数据
    }),
    // 根据全选的按钮,修改所有商品的勾选属性
    changeAllChecked: throttle(async function (event) {
      // 获取全选框的勾选状态
      let checked = event.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('changeALLGoodsChecked', checked)
      } catch (error) {
        alert('修改失败!');
      }
      this.getData();//更新数据
    }, 1000),
    // 跳转到结算页面
    toTrade() {
      this.$router.push({ name: 'Trade' })
    }
  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>