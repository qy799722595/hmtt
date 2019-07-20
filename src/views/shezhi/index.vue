<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm">
            <el-form-item label="编号:">{{userForm.id}}</el-form-item>
            <el-form-item label="手机号：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="邮箱：">{{userForm.email}}</el-form-item>
            <el-form-item label="用户名称:">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="用户简介：">
              <el-input type="textarea" v-model="userForm.intro" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updatedUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <p style="text-align:center">修改头像</p>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
      },
      // 这里声明的是接口文档的参数
      userForm: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    },
    async updatedUser () {
      const {
        data: { data }
      } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改信息成功')
      // console.log(data)
      // 让头部的用户名称和返回的用户名称同步
      // shezhi组件的数据要 传递给 home组件
      eventBus.$emit('updateHeaderName', data.name)
      // 因为刷新页面后，使用的是本地存储的时间sessionStorage数据
      // 当保存信息的时候应保存sessionStorage的信息
      const localUser = JSON.parse(window.sessionStorage.getItem('hmtt'))
      localUser.name = data.name
      window.sessionStorage.setItem('hmtt', JSON.stringify(localUser))
    },
    upload (data) {
      // console.log(data.file)  选择的图片
      // 把文件数据 放在 formData 中
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        // res.data是响应对象 当中还有一个data
        this.userForm.photo = res.data.data.photo
        // 更新头部
        event.$emit('updateHeaderphoto', res.data.data.photo)
        // 更新本地存储
        const localUser = JSON.parse(window.sessionStorage.getItem('hmtt'))
        localUser.photo = data.photo
        window.sessionStorage.setItem('hmtt', JSON.stringify(localUser))
        this.$message.success('上传成功')
      })
    }
    // handleSuccess (res) {
    //   // res 获取 res.data.photo 新头像地址
    // el-upload默认的是post请求 此时需要patch请求
    // http-request 来覆盖默认的上传行为 自己来上传
    // console.log(res.data.photo)
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
