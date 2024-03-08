export interface I18 {
  title: string;
  changeAvatar: string;
  rotate: string;
  preview: string;
  cancel: string;
  confirm: string;
}

export interface AvatarUploadProps {
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
  onCustomRequest?: (file: File, close?: () => void) => void;
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
  onError?: (err: Error, file: File, close?: () => void) => void;
  /**
   * @description Click close button
   */
  onClose?: () => void;
}
