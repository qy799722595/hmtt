<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog()">
      <!-- 父组件如果没有数据的时候使用默认图 -->
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- v-model="activeName  是选中了tab选项卡 name属性的值 -->
      <!--  label= 是选项卡的文字  内容就是对应的内容容器 el-tab-pane -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image" v-loading="loading">
          <!-- 单选框组 -->
          <div style="margin-bottom: 10px;" @change="toggleImage()">
            <el-radio-group v-model="reqParams.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="img-item"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selected(item.url)"
            v-for="item in images"
            :key="item.id"
          >
            <img :src="item.url" />
          </div>
          <!-- 分页器 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="peger"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      // 加载中
      loading: false,
      // 控制对话框的显示隐藏
      dialogVisible: false,
      // 控制选项卡对应的值
      activeName: 'image',
      // 请求素材列表参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片预览地址
      imageUrl: null,
      // 素材列表
      images: [],
      total: 0,
      // 选中的图片的id
      selectedImageUrl: null,
      // 默认为默认图片
      // 这个位置是否可以使用本地图片地址？
      // 项目是webpack打包，如果本地的资源地址，存储在数据中，是不会去打包到项目中的

      // 主动导入图片资源 此时图片资源就是一项数据(base64的数据)
      // value: defaultImage,
      defaultImage,

      // 上传图片头部信息
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtt')).token
      }
    }
  },
  methods: {
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      this.getImage()
    },
    //  获取列表
    async getImage () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    // 素材列表分页
    peger (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    // 素材列表切换
    toggleImage () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 选中当前点击的图片
    selected (url) {
      // 给当前点击的图片 加上selected
      // :class="{selected:条件}"
      // 条件：根据当前图片的url 去匹配遍历的时候id  一致加 不一致不加
      this.selectedImageUrl = url
    },
    // 确认图片
    confirmImage () {
      // activeName 是选中了tab选项卡 name属性的值
      if (this.activeName === 'image') {
        // 如果此时是image 应该使用selectedImageUrl这个地址
        if (!this.selectedImageUrl) return this.$message.info('请选则封面图')
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 否则 使用imageUrl  上传图片预览地址
        if (!this.imageUrl) return this.$message.info('请上传封面图')
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功后预览
    handleSuccess (res) {
      // 预览 地址
      this.imageUrl = res.data.url
    }
  }
}
</script>

<style lang="less" scoped>
.image-container {
  width: 150px;
  height: 120px;
  display: inline-block;
  margin: 0 20px 20px 0;
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  // &连接符
  &.selected {
    &::before {
      // 一个和图片一样大小的容器  有半透明背景 打钩图标
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 60px 60px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
