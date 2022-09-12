<template>
  <div>
    <TypeNav @clearCrumbs="clearAllCrumbs" />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑 -->
            <li class="with-x" v-show="searchData.categoryName">
              {{ searchData.categoryName }}
              <!-- 点击清除三级面包屑 -->
              <i @click="removeName">x</i>
            </li>
            <li class="with-x" v-show="searchData.keyword">
              {{ searchData.keyword }}
              <!-- 点击清除关键字面包屑 -->
              <i @click="removeKeyword">x</i>
            </li>
            <li class="with-x" v-if="searchData.trademark">
              <!-- trademark格式为" id:品牌 "，故需要对数据进行切割！ -->
              {{ searchData.trademark.split(":")[1] }}
              <!-- 点击清除品牌面包屑 -->
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 点击过的属性会有多个，props是一个数组！ -->
            <li
              class="with-x"
              v-for="(attr, index) in searchData.props"
              :key="index"
            >
              <!-- props格式为[" id:属性值：属性名 "] -->
              {{ `${attr.split(":")[2]}:${attr.split(":")[1]}` }}
              <!-- 点击清除属性值面包屑，需要传回索引值！ -->
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMark" @attrInfo="getAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- order字符串有1，说明对综合排序 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="javascript:;"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': IsAsc,
                        'icon-arrowBottom': IsDesc,
                      }"
                    >
                    </span
                  ></a>
                </li>
                <!-- order字符串有2，说明对价格排序 -->
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="javascript:;"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': IsAsc,
                        'icon-arrowBottom': IsDesc,
                      }"
                    >
                    </span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 使用声明式路由导航 -->
                    <router-link :to="`/detail/${goods.id}`">
                    <!-- 使用懒加载！ -->
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 ，props传四个参数-->
          <Pagination
            :pageNo="searchData.pageNo"
            :pageSize="searchData.pageSize"
            :total="total"
            :continues="5"
            @getPage="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      // 传给服务器搜索的参数
      searchData: {
        // 多级分类的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        // 搜索的关键字
        keyword: "",
        // 升序/降序
        order: "2:desc",
        // 分页器
        pageNo: 1,
        // 每页的商品格式
        pageSize: 5,
        // 商品属性参数
        props: [],
        // 品牌
        trademark: ""
      },
    }
  },
  components: {
    SearchSelector
  },
  computed: {
    // 获取商品列表
    ...mapGetters(['goodsList']),
    // 判断是否对综合排序
    isOne() {
      return this.searchData.order.indexOf('1') != -1
    },
    // 判断是否对价格排序
    isTwo() {
      return this.searchData.order.indexOf('2') != -1
    },
    // 判断升序
    IsAsc() {
      return this.searchData.order.indexOf('asc') != -1
    },
    IsDesc() {
      return this.searchData.order.indexOf('desc') != -1
    },
    // 获取仓库中关于分页器的数据
    ...mapState({
      total: state => state.search.searchGoodsList.total,
      // pageNo: state => state.search.searchGoodsList.pageNo,
      // pageSize: state => state.search.searchGoodsList.pageSize,
      // totalPages: state => state.search.searchGoodsList.totalPages,
    })
  },
  methods: {
    // 根据参数发送请求！
    getGoodsData() {
      this.$store.dispatch('getGoodsList', this.searchData);
    },
    removeName() {
      this.searchData.categoryName = undefined;
      // 清除面包屑的时候页码置1
      this.searchData.pageNo = 1;
      this.getGoodsData();
      // 请求后清空Id！
      this.searchData.category1Id = undefined;
      this.searchData.category2Id = undefined;
      this.searchData.category3Id = undefined;
      // 清除面包屑后地址栏也要改！目的：清除query参数！
      // 方法：在自己路由里跳转到自己，就能修改路径
      // 但是这样会清除query(面包屑)，也会清除params(keywords)
      // 但是params不应该清除!
      if (this.$route.params) {
        this.$router.push({ name: 'Search', params: this.$route.params });
      } else {
        this.$router.push({ name: 'Search' });
      }

    },
    // 清除关键字面包屑
    removeKeyword() {
      this.searchData.keyword = undefined;
      this.searchData.pageNo = 1;
      this.getGoodsData();
      // 全局事件总线，清除Header组件的搜索栏！
      this.$bus.$emit('clearKeyword');
      if (this.$route.query) {
        this.$router.push({ name: 'Search', query: this.$route.query });
      } else {
        this.$router.push({ name: 'Search' });
      }
    },
    // 清除品牌面包屑
    removeTrademark() {
      this.searchData.trademark = undefined;
      this.searchData.pageNo = 1;
      this.getGoodsData();
    },
    // 清除指定属性面包屑
    removeAttr(index) {
      this.searchData.props.splice(index, 1);
      this.searchData.pageNo = 1;
      this.getGoodsData();
    },
    // 清除品牌、属性的面包屑
    clearAllCrumbs() {
      this.searchData.trademark = undefined;
      this.searchData.pageNo = 1;
      this.searchData.props = [];
      this.getGoodsData();
    },
    // 处理自定义事件的回调！trade会点击的品牌信息
    tradeMark(trade) {
      // 整理品牌的信息：‘id：品牌’
      // console.log('trade :>> ', trade);
      this.searchData.pageNo = 1;
      this.searchData.trademark = `${trade.tmId}:${trade.tmName}`;
      this.getGoodsData();
    },
    // 自定义事件：点击商品属性，三个参数：id\属性名\属性值
    getAttr(attrId, attrValue, attrName) {
      // 请求格式：商品属性的数组: ["属性ID:属性值:属性名"]
      // 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
      // 可能点击多个属性，需要给数组添加，用push！
      // 考虑到重复点击，所以需要去重！
      this.searchData.pageNo = 1;
      let propsData = `${attrId}:${attrValue}:${attrName}`;
      if (this.searchData.props.indexOf(propsData) == -1) {
        this.searchData.props.push(propsData);
        this.getGoodsData();
      }


    },
    // 排序按钮点击响应函数
    changeOrder(flag) {
      // 判断对哪一个属性排序
      let tag1 = this.searchData.order.split(':')[0];
      // 如果是对已经排序的再点击，切换升降序
      if (flag == tag1) {
        this.searchData.order = `${flag}:${this.IsDesc ? "asc" : "desc"}`;
        this.getGoodsData();
        // 如果是对没有排序的属性排序，切换排序对象，默认升序
      } else {
        this.searchData.order = `${this.isOne ? '2' : '1'}:asc`;
        this.getGoodsData();
      }
    },
    // 分页器响应事件
    getPageNo(index) {
      this.searchData.pageNo = index;
      this.getGoodsData();
    }

  },
  beforeMount() {
    // 挂载前获取请求内容，合并成一个对象
    Object.assign(this.searchData, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getGoodsData();
  },
  watch: {
    $route(newValue, oldValue) {
      Object.assign(this.searchData, this.$route.query, this.$route.params);
      this.getGoodsData();
      this.searchData.category1Id = '';
      this.searchData.category2Id = '';
      this.searchData.category3Id = '';
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            &:hover {
              color: rgb(210, 36, 36);
            }
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>