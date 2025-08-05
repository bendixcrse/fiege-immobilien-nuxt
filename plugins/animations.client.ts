// Scroll in animation logic
export default defineNuxtPlugin((nuxtApp) => {
    const initAnimation = useState("initAnimation", () => false);
    const SCROLL_ANIMATION_TRIGGER_CLASSNAME = "scroll-trigger";
    const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = "scroll-trigger--offscreen";
    const SCROLL_ANIMATION_CANCEL_CLASSNAME = "scroll-trigger--cancel";
  
    const onIntersection = function(elements: any[], observer: any) {
      elements.forEach((element: any, index: number) => {
        if (element.isIntersecting) {
          const elementTarget = element.target;
          if (
            elementTarget.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)
          ) {
            elementTarget.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
            if (elementTarget.hasAttribute("data-cascade"))
              elementTarget.setAttribute("style", `--animation-order: ${index};`);
          }
  
          let style = window.getComputedStyle(elementTarget);
          let animationDelay = style.getPropertyValue('animation-delay');
          let animationDuration = style.getPropertyValue('animation-duration');
          let totalAnimationFinish = parseFloat(animationDelay) + parseFloat(animationDuration);
          // Warning: The CSS duration and delay has to be in seconds, not miliseconds
  
          setTimeout(function () {
            element.target.classList.add(SCROLL_ANIMATION_CANCEL_CLASSNAME);
          }, totalAnimationFinish * 1000);
          observer.unobserve(elementTarget);
        } else {
          element.target.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
          element.target.classList.remove(SCROLL_ANIMATION_CANCEL_CLASSNAME);
        }
      });
    }
  
    return {
      provide: {
        initializeScrollAnimationTrigger: () => {
          const animationTriggerElements = Array.from(
            document.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME)
          );
          if (animationTriggerElements.length === 0) return;
  
          const observer = new IntersectionObserver(onIntersection, {
            rootMargin: "0px 0px -5px 0px",
          });
          animationTriggerElements.forEach((element) =>
            observer.observe(element)
          );
          setTimeout(() => initAnimation.value = true, 1000)
        },
      },
    };
  });
  