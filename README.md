# A vue3 ts base component for avatar upload and crop

check emoji

✅ English JS Doc  
✅ Lang pt-BR support
✅ Composable support - dynamic component

![image](https://github.com/derlans/vue-avatar-upload/blob/master/imgs/preview.gif)

## how to use

## [demo](http://avatar-upload.derlan.top/)

## [codesandbox](https://codesandbox.io/p/github/derlans/vue-avatar-upload/master?workspace=%257B%2522activeFilepath%2522%253A%2522%252Fpreview%252FApp.vue%2522%252C%2522openFiles%2522%253A%255B%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clg88ugpd000x3n6jkshxocy6%2522%253A%257B%2522key%2522%253A%2522clg88ugpd000x3n6jkshxocy6%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522clg896gs500ga3n6jnlvlsznz%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clg88ugpd000x3n6jkshxocy6%2522%252C%2522spacesOrder%2522%253A%255B%2522clg88ugpd000x3n6jkshxocy6%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

### import

```
  import VueAvatarUpload from 'vue-avatar-upload';
  import 'vue-avatar-upload/lib/style.css';
```

```
  <VueAvatarUpload
    :url="UPLOAD_AVATAR_URL"
    :headers="headers"
    :avatar="userStore.avatar"
    @error="handleError"
    v-show="show"
    @close="show = false"
    @success="handleSuccess"
  />
```

## Props

```
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
  method?: 'POST' | 'GET';
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
  lang?: 'zh-CN' | 'zh-TW' | 'en';
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

```

### default value

```
  url: '',
  field: 'avatar',
  width: 300,
  height: 300,
  withCredentials: false,
  selectSize: 300,
  accept: 'image/*',
  method: 'POST',
  fixed: true,
  rotate: true,
  format: 'png',
  lang: 'zh-CN',
  showPreview: true,
  previewSize: 100,
```

## language

built-in `zh-CN` | `zh-TW` | `en` | `pt-BR`
you can use `lang` change the language
or use `i18` custom text

```
interface I18 {
  title: string
  changeAvatar: string
  rotate: string
  preview: string
  cancel: string
  confirm: string
}
```

## slots

![image](https://github.com/derlans/vue-avatar-upload/blob/master/imgs/slots.png)
