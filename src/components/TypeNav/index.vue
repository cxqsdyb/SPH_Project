<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <div class="container">
      <div @mouseleave="leave" @mouseenter="enter">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  :class="{ cur: index == currentIndex }"
                  @mouseenter="changeIndex(index)"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import _ from 'lodash';
// 最好的引入:按需加载
// import {throttle} from 'lodash'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    }
  },
  methods: {
    // 鼠标进入时修改currentIndex属性
    // changeIndex(index) {
    //   this.currentIndex = index
    // }
    // 使用lodash实现节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 40),

    goSearch(event) {
      // console.log('event :>> ', event);
      let location = {};
      let query = {};
      // 对event.dataset的解构赋值
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;
      if (categoryname) {
        location.name = 'Search';
        query.categoryName = categoryname;
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
      }
      // if (this.$route.params) {
      //   location.params = this.$route.params;
      // }
      location.query = query;
      this.$router.push(location);

      // 如果在Search组件中点击了，需要清空品牌、属性的面包屑！
      if(this.$route.path != '/home'){
        this.$emit('clearCrumbs');
      }
    },
    // 当鼠标移入时，让分类列表进行展示
    leave() {
      if (this.$route.path != '/home') {
        this.isShow = false;
      }
      this.changeIndex(-1);
    },
    enter() {
      if (this.$route.path != '/home') {
        this.isShow = true;
      }
    }
  },
  mounted() {
    this.leave();
    // 通知服务器发请求，获取数据，存于仓库中！
    // 不写在组件挂载，写在App挂载中！避免多次请求！
    //   this.$store.dispatch('categoryList');
    // if (this.$route.path != '/home') {
    //   this.isShow = false
    // }
  },
  computed: {
    ...mapState({
      // state为大仓库，需要调用其小仓库home的数据！
      categoryList: state => state.home.categoryList
    })
  }
}
</script>


<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &.cur {
              background: skyblue;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    // .sort-enter,
    // .sort-leave-to {
    //   height: 0px;
    // }
    // // 过渡动画结束状态（进入）
    // .sort-enter-to,
    // .sort-leave {
    //   height: 461px;
    // }
    // // 定义动画时间、速率
    // .sort-enter-active,
    // .sort-leave-active {
    //   transition: all 0.5s linear;
    // }
  }
}
</style>
