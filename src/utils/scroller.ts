import { animateValue } from 'framer-motion';

const calculateElementTop = (el: HTMLElement) => {
  let top = 0;
  while (el) {
    top += el.offsetTop;
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent as HTMLElement;
  }
  return top;
};

export const scrollToElement = (element: HTMLElement, delta = 40) => {
  const y = calculateElementTop(element);

  const to = y + delta;
  return bodyScrollTo(to);
};

// https://github.com/Innei/Shiro/blob/main/src/lib/scroller.ts
export const bodyScrollTo = (y: number | 'bottom' | 'top') => {
  const scrollTop =
    // FIXME latest version framer will ignore keyframes value `0`
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    // FIXME latest version framer will ignore keyframes value `0`
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // console.log('=======scroll', { scrollTop, y });
  const stopSpringScrollHandler = () => {
    animation.stop();
  };
  function getToValue(y: number | 'bottom' | 'top') {
    if (y === 'bottom') return scrollHeight;
    if (y === 'top') return scrollTop;
    return y;
  }
  const toValue = getToValue(y);
  const animation = animateValue({
    keyframes: [scrollTop + 1, toValue],
    autoplay: true,
    type: 'spring',
    damping: 24,
    onPlay() {
      window.addEventListener('wheel', stopSpringScrollHandler);
      window.addEventListener('touchmove', stopSpringScrollHandler);
    },

    onUpdate(latest) {
      if (latest <= 0) {
        animation.stop();
      }
      window.scrollTo(0, latest);
    },
  });

  animation.then(() => {
    window.removeEventListener('wheel', stopSpringScrollHandler);
    window.removeEventListener('touchmove', stopSpringScrollHandler);
  });
  return animation;
};
