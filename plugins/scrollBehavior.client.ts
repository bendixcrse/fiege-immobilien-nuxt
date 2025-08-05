export default defineNuxtPlugin(() => {
  const router = useRouter();
  let offset = 70;

  if(window.innerWidth > 800) offset += 67;
  else offset += 30;

  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "A" &&
      (target as HTMLAnchorElement).hash &&
      (target as HTMLAnchorElement).pathname === window.location.pathname
    ) {
      const anchor = (target as HTMLAnchorElement).hash;
      const el = document.querySelector(anchor);
      if (el) {
        e.preventDefault();
        
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }, 50);
      }
    }
  };
  window.addEventListener("click", handleAnchorClick);
});
