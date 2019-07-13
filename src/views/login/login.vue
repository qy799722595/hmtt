<template>
  <div class="login-container">
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link :underline="false" type="primary">用户协议</el-link>和
          <el-link :underline="false" type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 定义约定 rule是校验的对象 value是字段的值 callback是回调的提示信息（函数）
    const checkModile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机格式'))
      }
    }
    return {
      // 这是自己定义的
      loginForm: {
        // 这两个是从接口文档查的
        // 设置默认登录值
        mobile: '13911111111',
        code: '246810'
      },
      // 表单的校验规则对象
      loginRules: {
        mobile: [
          // 具体的校验规则  比如长度 格式
          // required 必填项 message 失败后的提示信息
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkModile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '验证码必填', trigger: 'blur' }
        ]
      },
      // 默认选中复选框
      checked: true
    }
  },
  methods: {
    login () {
      // 通过this拿到$refs  可以拿到所有的dom
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 如果校验成功 进行登录
          this.$http
            .post(
              'authorizations',
              this.loginForm
            )
            .then(res => {
              // res是响应对象 包含响应数据
              const data = res.data
              // 后台返回的是json内容 已经转换成了对象
              console.log(data)
              // 登录成功后 1、跳转到首页 2、保存登录页
              // 2.1保存登录后返回的用户信息 包含token
              // 2.2使用sessionStrage.setItem 来存储数据
              window.sessionStorage.setItem('hmtt', JSON.stringify(res.data.data))
              this.$router.push('/')
            })
            .catch(err => {
              // 提示错误信息 使用组件 消息提示组件  $message是ui框架中自带的属性 直接使用即可
              console.log(err)
              this.$message.error('用户名或密码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 480px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 180px;
      margin: 10px auto 30px;
    }
  }
  .el-link {
    font-size: 15px;
    color: #409eff;
  }
  .el-checkbox {
    margin-right: 5px;
  }
}
</style>
