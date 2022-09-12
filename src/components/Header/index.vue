<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 测试自定义组件！ -->
    <!-- <p v-upper="testWord"></p> -->
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <!-- 如果登录，显示用户信息，未登录，显示注册和登录 -->
          <p>尚品汇欢迎您！</p>
          <!-- 如果登陆了 -->
          <p v-if="userName">
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p> 
          <!-- 如果没登录 -->
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a @click="toCenter">我的订单</a>
          <a @click="toShopCart">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- 因为是按钮，所以就用编程式导航 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      keyword: '',
      testWord:'hello！'
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    }
  },
  methods: {
    // 点击按钮跳转路由
    goSearch() {
      // 1、使用模板字符串
      // this.$router.push(`/search/?key=${this.keyWord}`)
      // 2、使用对象形式
      if (this.$route.query) {
        let location = {
          name: 'Search',
          params: { keyword: this.keyword || undefined }
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }


    },
    toShopCart() {
      this.$router.push({ name: 'ShopCart' });
    },
    toCenter() {
      this.$router.push({ name: 'Center' });
    },
    // 退出登录
    async logout() {
      try {
        // 告知服务器、清理本地token和仓库中用户数据
        let result = await this.$store.dispatch('userLogout');
        alert(result);
        this.$router.push({ name: 'Home' })
      } catch (error) {
        alert(error);
      }

    }
  },
  mounted() {
    this.$bus.$on('clearKeyword', () => {
      this.keyword = '';
    })
  },
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>