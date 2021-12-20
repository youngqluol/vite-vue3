import { ref, h } from 'vue';
import type { SetupContext } from 'vue';

interface CompProps {
  text: string;
}

export default function comp(props: CompProps, context: SetupContext) {
  const { text } = props;
  // 获取插槽
  const slot = (context.slots.default && context.slots.default()) || [];

  return h(
    'div',
    {
      id: 'comp'
    },
    [text, h('span', {}, slot)]
  );
}
