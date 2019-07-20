<template>
  <el-container class="home-container">
    <!-- :后面定义的必须是又含义的  比如:width 改的就是宽  :class 改的就是样式 -->
    <el-aside class="my-aside" :width="collapse?'68px':'200px'">
      <div class="logo" :class="{close:collapse}"></div>
      <!--
          :collapse="collapse"  定义的是折叠收起  在ui框架中 默认的是true 也就是折叠 这里改成false 收起
      :collapse-transition="false"定义的是禁止动画效果-->
      <!-- :default-active="$route.path"   注意 route(获取路由数据的)  不加r  不是router(调用路由方法的)
                ------------------------route   和   router  一定要分清
      -->
      <el-menu
        :default-active="$route.path"
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
      <!-- 头部标签  el-header -->
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="qhcd()"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img :src="avatar" alt class="tp" />
            <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- @click.native  触发原生事件 -->
            <el-dropdown-item class="el-icon-setting" @click.native="shezhi()">个人设置</el-dropdown-item>
            <br />
            <el-dropdown-item class="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 内容区 -->
      <!-- <el-main>这是内容区域  所有的内容要放在这个标签里面</el-main> -->
      <!-- 二级路由对应的组件 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hmtt'))
    // 从token中得知 name是用户名  photo是图片路径 因此我们可以通过this.name = user.name获取token中的name
    // this.avatar = user.photo 获取图片的路径
    // 获取user的name信息和图片信息  然后在黑马小哥添加插值表达式 {{name}}  图片的src改成avatar  注意要给src加:号 绑定src
    this.name = user.name
    this.avatar = user.photo

    // 绑定事件
    eventBus.$on('updateHeaderName', name => {
      this.name = name
    })
    // 绑定事件
    eventBus.$on('updateHeaderphoto', photo => {
      this.name = photo
    })
  },
  methods: {
    qhcd () {
      this.collapse = !this.collapse
    },

    // click事件是给谁绑定 el-dropdown-item
    // 它不是原生的dom,不一定支持原生的事件绑定
    // 如果我想给组件绑定原生的事件怎么办  需要给组件解析后的原生标签绑定
    // 使用一个事件修饰符 栗子：@click.prevent  最默认行为  @click.native 触发原生事件
    shezhi () {
      // this.$router.push('/setting')
      // 点击跳转到个人设置页面
      location.hash = '#/shezhi'
    },
    logout () {
      // 这种方法不推荐  因为只是把数据设置为空 但是还存在位置
      // window.sessionStorage.setItem('hm73-toutiao', null)
      // 点击退出登录 清除sessionStorage数据 并跳转到login页面
      window.sessionStorage.removeItem('hmtt')
      this.$router.push('/login')
    }
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
    .close {
      background: url("../../assets/images/logo_admin_01.png") no-repeat center /
        34px auto;
    }
    .el-menu {
      border: none;
      margin-top: 10px;
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
