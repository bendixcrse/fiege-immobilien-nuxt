// app/router.options.ts
export default {
  async scrollBehavior(to, from, savedPosition) {
    let offset = 70;

    if (window.innerWidth > 800) offset += 67;
    else offset += 30;

    if (savedPosition) return savedPosition;

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.querySelector(to.hash);
          if (el) {
            const top =
              el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
          resolve(false);
        }, 500);
      });
    }

    return { top: 0, behavior: "smooth" };
  },
};
