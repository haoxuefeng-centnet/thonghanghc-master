<template>
  <div class="upload-thum">
    <div v-for="item in uploadList" :key="item.uid" class="upload-list">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :multiple="true"
      type="drag"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="5242880"
      :default-file-list="defaultList"
      :show-upload-list="false"
      :action="actionUrl"
      :headers="uploadHeader"
      :on-success="handleSuccess"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      class="uploader"
      :class="{ hidden: uploadList.length >= 1 }"
    >
      <div class="uploader-box">
        <Icon type="md-add" />
      </div>
    </Upload>
    <Modal v-model="visible" title="查看图片">
      <img :src="showPic" style="width: 100%" v-if="visible" />
    </Modal>
  </div>
</template>

<script>
import { upLoadMixins } from '@/mixins'
// 组件逻辑
export default {
  // 组件名称
  name: 'UploadPanel',
  mixins: [upLoadMixins],
  // 数据传递
  props: {
    // 默认图片
    defaultImg: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    defaultImg: {
      immediate: true,
      handler(val) {
        if (val) {
          this.defaultList[0] = { url: '' }
          this.defaultList[0] && (this.defaultList[0].url = val)
        }
      }
    }
  },
  // 数据绑定
  data() {
    return {
      // 默认图片
      defaultList: [],
      uploadHeader: {
        userToken: this.$store.state.user.token
      },
      showPic: '',
      visible: false,
      uploadList: [],
      tempIndex: 1
    }
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        // 赋值后马上更新
        this.uploadList = this.$refs.upload.fileList
      })
    }, 600)
  },
  methods: {
    handleView(url) {
      this.showPic = url
      this.visible = true
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        file.url = `${res.data}`
        this.$emit('getUploadImg', `${res.data}`)
      } else {
        this.$Message.error(res.msg)
        console.error('客户端图片上传出错--->', res.msg)
      }
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '只能上传一张缩略图'
        })
      }
      return check
    }
  }
}
</script>

<style lang="less" scoped>
@boxWidth: 100px;

.upload-thum {
  .uploader {
    width: @boxWidth;
    display: inline-block;
    .uploader-box {
      height: @boxWidth - 2px;
      line-height: @boxWidth - 2px;
      i {
        line-height: @boxWidth - 2px;
        font-size: 24px;
      }
    }
    &.hidden {
      display: none;
    }
  }
  .upload-list {
    display: inline-block;
    width: @boxWidth;
    height: @boxWidth;
    text-align: center;
    line-height: @boxWidth;
    border: 1px solid transparent;
    border-radius: 2px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      .upload-list-cover {
        display: block;
      }
    }
  }
  .upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      margin: 0 8px;
      line-height: @boxWidth;
    }
  }
}
</style>
