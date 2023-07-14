import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';

export default function useFetch(urlFn: () => any) {
  const isPending = ref(false);
  const error: Ref = ref('');
  const data: Ref = ref('');

  const url = urlFn();

  watchEffect(() => {
    isPending.value = true;
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        isPending.value = false;
        data.value = res;
      })
      .catch((e) => {
        isPending.value = false;
        error.value = e;
      });
  });

  return {
    isPending,
    error,
    data,
  };
}
