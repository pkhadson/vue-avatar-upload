<template>
  <div
    :class="{
      'avatar-upload-root': true,
      'avatar-upload-root-fixed': Props.fixed,
    }"
  >
    <div :class="{ 'avatar-upload-fade': Props.fixed }" />
    <div :class="{ 'avatar-upload': true, 'avatar-upload-fixed': Props.fixed }">
      <div class="avatar-upload-header">
        <div v-if="!slots.title" class="avatar-upload-title">
          {{ defaultI18.title }}
        </div>
        <slot name="title" />
        <div class="avatar-upload-close" @click="Props.onClose">
          <slot name="closeIcon" />
          <svg
            v-if="!slots.closeIcon"
            t="1649489376154"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2215"
            width="16"
            height="16"
          >
            <path
              d="M184.64768 836.34176c3.9936 3.9936 9.23648 5.98016 14.47936 5.98016 5.24288 0 10.48576-2.00704 14.49984-6.00064l292.70016-293.04832 292.70016 293.04832c3.9936 4.01408 9.23648 6.00064 14.49984 6.00064 5.24288 0 10.48576-2.00704 14.47936-5.98016 8.00768-7.9872 8.00768-20.95104 0.02048-28.95872L535.61344 514.64192 828.0064 221.92128c7.9872-8.00768 7.9872-20.97152-0.02048-28.95872-8.02816-8.00768-20.97152-8.00768-28.95872 0.02048L506.30656 486.03136 213.6064 192.98304c-8.00768-8.00768-20.97152-8.00768-28.95872-0.02048-8.00768 7.9872-8.00768 20.95104-0.02048 28.95872l292.37248 292.72064L184.6272 807.38304C176.64 815.37024 176.64 828.35456 184.64768 836.34176z"
              fill=""
              p-id="2216"
            />
          </svg>
        </div>
      </div>
      <div class="avatar-upload-main">
        <div>
          <div
            ref="editBox"
            class="avatar-upload-edit"
            :style="editBoxSizeStyle"
          >
            <div class="edit-fade" />
            <div ref="select" class="edit-select" :style="selectBoxStyle">
              <span class="edit-selcet-img-box">
                <img
                  :src="avatar"
                  alt=""
                  :style="selsctImgStyle"
                  class="edit-select-img"
                  @dragstart.prevent=""
                  @select.prevent=""
                />
              </span>
              <span class="edit-selcet-border border-3-white" />
              <span
                v-show="!Props.disableSelect"
                ref="resize"
                class="select-zoom-point"
              />
            </div>
            <img
              ref="bgAvatar"
              :src="avatar"
              alt=""
              :style="bgImgStyle"
              class="edit-bg"
              @dragstart.prevent=""
              @select.prevent=""
            />
          </div>
          <div class="avatar-upload-operation">
            <span style="cursor: pointer" @click="file!.click()">{{
              defaultI18.changeAvatar
            }}</span>
            <span
              style="cursor: pointer"
              class="upload-operation-close"
              @click="updateRotate"
            >
              <template v-if="Props.rotate">
                <svg
                  t="1649489582570"
                  class="icon-rotate"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3047"
                  width="16"
                  height="16"
                >
                  <path
                    d="M503.466667 285.866667L405.333333 226.133333c-8.533333-8.533333-12.8-21.333333-8.533333-29.866666 8.533333-8.533333 21.333333-12.8 29.866667-8.533334l145.066666 89.6c8.533333 4.266667 12.8 17.066667 8.533334 29.866667l-89.6 145.066667c-4.266667 8.533333-17.066667 12.8-29.866667 8.533333-8.533333-4.266667-12.8-17.066667-8.533333-29.866667l64-102.4c-123.733333 4.266667-226.133333 106.666667-226.133334 234.666667s106.666667 234.666667 234.666667 234.666667c85.333333 0 162.133333-46.933333 204.8-119.466667 4.266667-8.533333 17.066667-12.8 29.866667-8.533333 8.533333 4.266667 12.8 17.066667 8.533333 29.866666-51.2 85.333333-140.8 140.8-238.933333 140.8-153.6 0-277.333333-123.733333-277.333334-277.333333 0-145.066667 110.933333-264.533333 251.733334-277.333333z"
                    p-id="3048"
                  />
                </svg>
                <span>{{ defaultI18.rotate }}</span>
              </template>
            </span>
          </div>
        </div>
        <div v-if="Props.showPreview" class="avatar-upload-preview">
          <span>{{ defaultI18.preview }}</span>
          <div
            class="preview-radius border-3-white"
            :style="previewBoxSizeStyle"
          >
            <img
              :src="avatar"
              alt=""
              :style="previewImgStyle"
              @dragstart.prevent=""
              @select.prevent=""
            />
          </div>
          <div
            class="preview-square border-3-white"
            :style="previewBoxSizeStyle"
          >
            <img
              :src="avatar"
              alt=""
              :style="previewImgStyle"
              @dragstart.prevent=""
              @select.prevent=""
            />
          </div>
        </div>
      </div>
      <div class="avatar-upload-actions">
        <div @click="Props.onClose">
          <div v-if="!slots.cancel" class="avatar-button -regular">
            {{ defaultI18.cancel }}
          </div>
          <slot name="cancel" />
        </div>
        <div @click="upload">
          <div v-if="!slots.confirm" class="avatar-button -salmon">
            {{ defaultI18.confirm }}
          </div>
          <slot name="confirm" />
        </div>
      </div>
      <div v-show="false">
        <input
          ref="file"
          type="file"
          :name="Props.field"
          :accept="Props.accept"
          @input="changeFile"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef, Ref, StyleValue } from "vue";
import { computed, nextTick, reactive, ref, toRef, useSlots, watch } from "vue";
import { createCutImg, getRange, uploadFile } from "./utils";
import type { MRef, RefElement, Size, SizeStyle } from "./type";
import { useBackImgOperate, useSelectOperate } from "./useOperate";
import i18 from "./i18.json";
interface I18 {
  title: string;
  changeAvatar: string;
  rotate: string;
  preview: string;
  cancel: string;
  confirm: string;
}
interface AvatarUploadProps {
  /**
   * @description Initial image source
   */
  avatar?: string;
  /**
   * @description Image upload URL
   */
  url?: string;
  /**
   * @description Image upload field name
   */
  field?: string;
  /**
   * @description Upload file format
   */
  format?: string;
  /**
   * @description HTTP request headers to carry with the upload
   */
  headers?: Record<string, string>;
  /**
   * @description HTTP request data to carry with the upload
   */
  data?: Record<string, string>;
  /**
   * @description Image box width
   */
  width?: number;
  /**
   * @description Image box height
   */
  height?: number;
  /**
   * @description Initial size of the selection box
   */
  selectSize?: number;
  /**
   * @description Cross domain with cookie
   */
  withCredentials?: boolean;
  /**
   * @description Upload method
   */
  method?: "POST" | "GET";
  /**
   * @description Accepted file type
   */
  accept?: string;
  /**
   * @description Whether to still user operation selection box
   */
  disableSelect?: boolean;
  /**
   * @description Can rotate
   */
  rotate?: boolean;
  /**
   * @description Is fixed
   */
  fixed?: boolean;
  /**
   * @description Is show preview
   */
  showPreview?: boolean;
  /**
   * @description Preview box size
   */
  previewSize?: number;
  /**
   * @description Custom text i18n
   */
  i18?: I18;
  /**
   * @description Language
   */
  lang?: "zh-CN" | "zh-TW" | "en";
  /**
   * @description Custom upload
   */
  onCustomRequest?: (file: File) => void;
  /**
   * @description Upload before callback, if return false can prevent upload
   */
  onBefoureUpload?: (file: File) => boolean | Promise<boolean>;
  /**
   * @description Upload success callback
   */
  onSuccess?: (response: any, file: File) => void;
  /**
   * @description Upload fail callback
   */
  onError?: (err: Error, file: File) => void;
  /**
   * @description Click close button
   */
  onClose?: () => void;
}

const Props = withDefaults(defineProps<AvatarUploadProps>(), {
  avatar: "",
  url: "",
  field: "avatar",
  width: 300,
  height: 300,
  withCredentials: false,
  selectSize: 300,
  accept: "image/*",
  method: "POST",
  fixed: true,
  rotate: true,
  disableSelect: false,
  format: "png",
  lang: "zh-CN",
  showPreview: true,
  previewSize: 100,
});
const defaultI18 = (Props.i18 || i18[Props.lang] || i18["zh-CN"]) as I18;
const slots = useSlots();
const avatar: Ref<string> = ref(Props.avatar);
watch(
  () => Props.avatar,
  (v) => {
    avatar.value = v;
    initImgSize();
  }
);
// 编辑框尺寸不是响应式的
const {
  width: editBoxWidth,
  height: editBoxHeight,
  selectSize,
  previewSize,
  disableSelect,
} = Props;
const initSelectSize =
  selectSize < Math.min(Props.width, Props.height)
    ? selectSize
    : Math.min(Props.width, Props.height);
// 编辑器尺寸style
const editBoxSizeStyle: SizeStyle = {
  width: `${editBoxWidth}px`,
  height: `${editBoxHeight}px`,
};
// 图片尺寸 图片加载完之前默认为编辑器尺寸
const imgSize: Size = reactive({
  width: editBoxWidth,
  height: editBoxHeight,
});
// 头像图片element
const bgAvatar: MRef<HTMLImageElement> = ref(null);
// 图片改动就重置尺寸
watch(
  bgAvatar,
  () => {
    if (bgAvatar.value?.width) initImgSize();
  },
  {
    immediate: true,
  }
);
// 编辑器最外层element 确定拖拽和滚动的范围
const editBox: RefElement = ref(null);
// 背景图片的操作 包括缩放、旋转、移动
const { bgImgZoom, baImgX, baImgY, bgImgStyle, imgRotate, updateRotate } =
  useBackImgOperate(editBox, imgSize);
// 把图片变为object-fit: cover;的形式 填充满不拉伸
function initImgSize() {
  // 挂载dom之后才能获得正确的宽高
  nextTick(() => {
    const el = bgAvatar.value!;
    // 图片加载完后才能获取宽高
    el.onload = () => {
      const width = el.naturalWidth;
      const height = el.naturalHeight;
      if (width / height > editBoxWidth / editBoxHeight) {
        bgImgZoom.value = editBoxHeight / height;
        imgSize.height = height;
        imgSize.width = width;
      } else {
        bgImgZoom.value = editBoxWidth / width;
        imgSize.height = height;
        imgSize.width = width;
      }
      baImgX.value = 0;
      baImgY.value = 0;
    };
  });
}
// 选择框
const select: RefElement = ref(null);
// 调整选择器大小按钮
const resize: RefElement = ref(null);
// 选择框的操作 包括缩放、移动
const { selectBoxSize, selectBoxStyle, selectX, selectY } = useSelectOperate({
  initSize: initSelectSize,
  select,
  resize,
  bgBoxSize: { width: editBoxWidth, height: editBoxHeight },
  limitSize: { width: editBoxWidth, height: editBoxHeight },
  disable: disableSelect,
});
// 选择框内图片的样式
const selsctImgStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${imgSize.width * bgImgZoom.value}px`,
    height: `${imgSize.height * bgImgZoom.value}px`,
    left: `${baImgX.value - selectX.value}px`,
    top: `${baImgY.value - selectY.value}px`,
    transform: `rotate(${imgRotate.value}deg)`,
  };
});
const previewBoxSizeStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${previewSize}px`,
    height: `${previewSize}px`,
  };
});
// 预览图片的样式
const previewImgStyle: ComputedRef<StyleValue> = computed(() => {
  const zoom = previewSize / selectBoxSize.value;
  return {
    width: `${imgSize.width * zoom * bgImgZoom.value}px`,
    height: `${imgSize.height * zoom * bgImgZoom.value}px`,
    left: `${(baImgX.value - selectX.value) * zoom}px`,
    top: `${(baImgY.value - selectY.value) * zoom}px`,
    transform: `rotate(${imgRotate.value}deg)`,
  };
});

const file: MRef<HTMLInputElement> = ref(null);
function changeFile(e: Event) {
  const file = e.target as HTMLInputElement;
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const url = (e.target as FileReader).result;
    if (url) {
      avatar.value = url as string;
      initImgSize();
    }
    file.value = "";
  };
  reader.readAsDataURL(file.files![0]);
}
async function upload() {
  const formData = new FormData();
  const blob = await getImgData();
  const format = Props.format;
  formData.append(Props.field, blob, `avatar.${format}`);
  const data = Props.data || {};
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  const file = new File([blob], `avatar.${format}`, {
    type: `image/${format}`,
  });
  if (Props.onCustomRequest) {
    await Props.onCustomRequest(file);
    return;
  }
  if (Props.onBefoureUpload) {
    const result = await Props.onBefoureUpload(file);
    if (!result) return;
  }
  uploadFile(formData, Props.url, Props.method, {
    headers: Props.headers,
    withCredentials: Props.withCredentials,
  })
    .then((res) => {
      Props.onSuccess?.(res, file);
    })
    .catch((err) => {
      Props?.onError?.(err, file);
    });
}
const cutImg = createCutImg();
function getImgData() {
  const range = getRange(
    {
      left: selectX.value,
      top: selectY.value,
      width: selectBoxSize.value,
      height: selectBoxSize.value,
    },
    {
      left: baImgX.value,
      top: baImgY.value,
      width: imgSize.width,
      height: imgSize.height,
      zoom: bgImgZoom.value,
    }
  );
  return cutImg(avatar.value, range, Props.format);
}
</script>

<style scoped lang="scss">
.avatar-upload-root {
  --fixed-fade-z-index: 999;
  --fixed-main-z-index: 1000;
  img {
    max-width: unset;
    max-height: unset;
  }
}

.avatar-upload-root-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
  display: flex;
  align-items: center;
}
.avatar-upload-fade {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: var(--fixed-z-index);
}
.avatar-upload {
  border-radius: 10px;
  background-color: #fff;
  padding: 5px 15px;
  user-select: none;
  z-index: var(--fixed-main-z-index);
  .border-3-white {
    border: 3px solid #fff;
  }
}
.avatar-upload-fixed {
  position: fixed;
}
.avatar-upload-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
  .avatar-upload-close {
    font-size: 18px;
    cursor: pointer;
  }
}
.avatar-upload-main {
  padding: 10px;
  display: flex;
  justify-content: center;
  .edit-fade {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
}
.avatar-upload-edit {
  position: relative;
  cursor: move;
  margin-right: 10px;
  overflow: hidden;
  background-image: url("./no.png");
  background-repeat: repeat;
  .edit-select {
    position: absolute;
    border-radius: 50%;
    cursor: move;
    z-index: 3;
    .select-zoom-point {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
      left: 84%;
      top: 84%;
      cursor: se-resize;
    }
    .edit-selcet-border {
      position: absolute;
      display: block;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border-radius: 50%;
      box-sizing: border-box;
      top: -2px;
      left: -2px;
    }
    /*  不要让选择框有边框 会影响计算位置 因此另外造一个当边框*/
    .edit-selcet-img-box {
      overflow: hidden;
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .edit-select-img {
      user-select: none;
      display: block;
      position: absolute;
    }
  }
}
.edit-bg {
  user-select: none;
  display: block;
  position: absolute;
  z-index: 2;
  cursor: move;
}
.avatar-upload-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #f2f2f2;
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 14px;
  .preview-radius {
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    & > img {
      position: absolute;
    }
  }
  .preview-square {
    overflow: hidden;
    position: relative;
    & > img {
      position: absolute;
    }
  }
}
.avatar-upload-operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: red;
  height: 20px;
  margin-right: 10px;
}
.upload-operation-close {
  display: flex;
  align-items: center;
}
.icon-rotate {
  color: red;
  fill: currentColor;
}
.avatar-upload-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  .avatar-button {
    display: flex;
    overflow: hidden;
    margin: 10px;
    padding: 8px 12px;
    cursor: pointer;
    user-select: none;
    transition: all 150ms linear;
    text-align: center;
    white-space: nowrap;
    text-decoration: none !important;
    text-transform: none;
    text-transform: capitalize;
    color: #fff;
    border: 0 none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    justify-content: center;
    align-items: center;
    flex: 0 0 160px;
    box-shadow: 2px 5px 10px #e4e4e4;
    &:hover {
      transition: all 150ms linear;
      opacity: 0.85;
    }
    &:active {
      transition: all 150ms linear;
      opacity: 0.75;
    }
    &:focus {
      outline: 1px dotted #959595;
      outline-offset: -4px;
    }
  }
  .avatar-button.-regular {
    color: #202129;
    background-color: #f2f2f2;

    &:hover {
      color: #202129;
      background-color: #e1e2e2;
      opacity: 1;
    }

    &:active {
      background-color: #d5d6d6;
      opacity: 1;
    }
  }
  .avatar-button.-salmon {
    color: #ffffff;
    background: #f32c52;
  }
}
</style>
