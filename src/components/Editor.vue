<template>
  <div class="editor">
    <Upload
      :id="`upLoad-${id}`"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png', 'gif']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      multiple
      :action="actionUrl"
    >
      <Button icon="ios-cloud-upload-outline"></Button>
    </Upload>
    <quillEditor
      ref="myEditor"
      v-model="htmlContext"
      :content="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quillEditor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { upLoad } from '@/mixins'
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  // ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  // [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  // [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  // ['clean'], // 清除文本格式
  ['link', 'image'] // 链接、图片、视频(video)
]
export default {
  name: 'Editor',
  components: { quillEditor },
  mixins: [upLoad],
  props: {
    content: {
      type: String,
      default: () => ''
    },
    id: {
      type: Number,
      default: () => Math.ceil(Math.random() * 1000)
    },
    editorOption: {
      type: Object,
      default: () => {
        return {
          placeholder: '您想写点什么？',
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                // 拦截图片上传事件
                image: function() {}
              }
            }
          }
        }
      }
    }
  },
  watch: {
    content(value) {
      this.htmlContext = value
    }
  },
  data() {
    return {
      htmlContext: '',
      timer: null
    }
  },
  mounted() {
    // 拦截编辑器自带的图片上传功能(这样拦截是为了解决当页面多次调用富文本组件时，区分图片上传按钮)
    this.$refs.myEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  // 编辑器图片上传
  imgHandler(value) {
    if (value) {
      // 调用iview图片上传
      // console.log(`#upLoad-${this.id}`)
      // console.log(document.querySelector(`#upLoad-${this.id} .ivu-upload .ivu-btn`))
      document.querySelector(`#upLoad-${this.id} .ivu-upload .ivu-btn`).click()
    }
  },
  methods: {
    // 失去焦点事件
    onEditorBlur() {},
    // 获得焦点事件
    onEditorFocus() {},
    // 内容改变事件
    onEditorChange(e) {
      clearTimeout(this.timer)
      // 函数防抖，防止用户频繁输入
      this.timer = setTimeout(() => {
        this.htmlContext = e.html
        this.$emit('onEditorChange', this.htmlContext)
      }, 500)
    },
    // 编辑器初始化事件
    handleSuccess(res) {
      // 获取富文本组件实例
      const quill = this.$refs.myEditor.quill
      // 获取光标所在位置
      const length = quill.getSelection().user
      if (res.success) {
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res.message)
        // 调整光标到最后
        quill.setSelection(length + 1)
      }
    }
  }
}
</script>

<style scoped lang="less">
.editor {
  margin-top: 20px;
  /deep/.ql-editor {
    min-height: 100px;
    max-height: 300px;
    width: 300px;
    overflow-y: auto;
  }
}
.ivu-upload {
  display: none;
}
</style>
