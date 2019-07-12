<template>
  <el-container class="home-container">
      <!-- :后面定义的必须是又含义的  比如:width 改的就是宽  :class 改的就是样式 -->
    <el-aside class="my-aside" :width="collapse?'68px':'200px'">
      <div class="logo" :class="{close:collapse}"></div>
      <!--
          :collapse="collapse"  定义的是折叠收起  在ui框架中 默认的是true 也就是折叠 这里改成false 收起
         :collapse-transition="false"定义的是禁止动画效果 -->
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/contents">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/sucai">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/wenzhang">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/pinglun">
          <i class="el-icon-chat-dot-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/shezhi">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 头 -->
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="qhcd()"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt class="tp" />
            <b style="vertical-align:middle;padding-left:5px">黑马小哥</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <div @click="fn()"> -->
              <el-dropdown-item class="el-icon-setting">个人设置</el-dropdown-item>
            <!-- </div> -->
            <br />
            <!-- <div> -->
              <el-dropdown-item class="el-icon-unlock">退出登录</el-dropdown-item>
            <!-- </div> -->
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- <el-main>Main</el-main> -->
      <!-- 二级路由对应的组件 -->
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    qhcd () {
      this.collapse = !this.collapse
    }
    // fn () {
    //   // this.$router.push('/setting')
    //   location.hash = '#/shezhi'
    // }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002048 url(../../assets/images/logo_admin.png) no-repeat
        center / 120px auto;
    }
    .close{
      background: url('../../assets/images/logo_admin_01.png') no-repeat center / 34px auto
    }
    .el-menu{
      border: none;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 26px;
      line-height: 60px;
      vertical-align: middle;
    }
    .text {
      padding-left: 5px;
      line-height: 60px;
      vertical-align: middle;
    }
    .el-dropdown-link {
      line-height: 60px;
      .tp {
        width: 28px;
        vertical-align: middle;
      }
    }
  }
}
</style>

<style>
</style>
