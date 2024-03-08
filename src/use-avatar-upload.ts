import { AvatarUploadProps } from "./interfaces";
import { render, createVNode } from "vue";
import VueAvatarUpload from "./index.vue";

interface IOpts {
  color?: string;
  btnColor?: string;
  textColor?: string;
  default?: Partial<AvatarUploadProps>;
}

export const useAvatarUpload =
  (opts?: IOpts) => (newOpts?: AvatarUploadProps) => {
    const container = document.createElement("div");
    const props = {
      ...opts?.default,
      ...newOpts,
    };

    const vnode = createVNode(VueAvatarUpload, {
      style: {
        "--au-btn-color": opts?.btnColor || opts?.color || "#409EFF",
        "--au-text-color": opts?.textColor || opts?.color || "#222",
      },
      onClose: () => {
        render(null, container);
        container.remove();
      },
      ...props,
    });
    render(vnode, container);
    document.querySelector(".v-main")?.appendChild(container.firstChild!);
  };
