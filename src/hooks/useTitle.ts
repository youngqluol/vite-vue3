import { ref, watch, Ref } from 'vue';

export type MaybeRef<T> = T | Ref<T>

export default function useTitle(newTitle: MaybeRef<string | null | undefined> = null) {
  // 双问号 ?? 的操作符跟 || 类似，如果给定变量值为 *null 或者 undefined*，刚使用双问号后的默认值，否则使用该变量值。
  const title = ref(newTitle ?? document?.title ?? null);
  watch(
    title,
    (newV, oldV) => {
      if (newV && newV !== oldV) {
        document.title = newV;
      }
    },
    {
      immediate: true
    }
  );
  return title;
}
