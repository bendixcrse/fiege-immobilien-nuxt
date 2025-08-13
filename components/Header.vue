<script setup lang="ts">
const route = useRoute();
const transparentHeader = useTransparentHeader();
const burgerMenu = useBurgerMenuOpen();
const settings = useSettings();
const alternateLanguages = useAlternateLanguages();
const localePath = useLocalePath();
const isScrolled = useState("scrolled_header", () => false);
const router = useRouter();

const header = reactive({ isHome: true });

function toggleMenu() {
  burgerMenu.value = !burgerMenu.value;
}

onMounted(() => {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) isScrolled.value = true;
    else isScrolled.value = false;
  });

  if (router.currentRoute.value.hash) isScrolled.value = true;
});

watch(
  () => route.name,
  (value) => {
    let routename: string = (route.name as string) ?? "index___";
    header.isHome = routename.split("___")[0] == "index";
  },
  { deep: true, immediate: true }
);

async function scrollToTop() {
  await router.push(localePath({ path: "/" }));
  window.scrollTo({ top: 0, behavior: "smooth" });
  burgerMenu.value = false;
}
</script>

<template>
  <div
    class="bx-header-container"
    :class="{
      transparent: transparentHeader,
      scrolled: isScrolled && settings?.data.logo.url,
      'menu-open': burgerMenu,
    }"
  >
    <div class="bx-inner">
      <div
        class="bx-logo-container animate--slide-in scroll-trigger"
        :style="{ '--animation-order': 2 }"
        @click="scrollToTop"
      >
        <PrismicImage v-if="settings?.data.logo.url" :field="settings?.data.logo"></PrismicImage>
        <div class="bx-logo-text"><strong>Leif Fiege</strong><br />Immobilienmanagement</div>
      </div>

      <div
        class="bx-menu-col animate--slide-in scroll-trigger"
        :style="{ '--animation-order': 1 }"
      >
        <nav v-if="alternateLanguages.length > 0" class="bx-languages-container">
          <div class="bx-language-icon"></div>
          <ul>
            <li v-for="lang in alternateLanguages" :key="lang.lang">
              <PrismicLink :field="{ ...lang, link_type: 'Document' }">
                <span class="sr-only">{{ lang.lang.split("-")[0] }}</span>
              </PrismicLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="bx-actions-col animate--slide-in scroll-trigger"
        :style="{ '--animation-order': 3 }"
      >
        <ContactButton
          class="bx-contact-button"
          v-if="settings?.data.cta_button"
          :link="settings?.data.cta_button"
          :contact_name="settings?.data.contact_name"
          :contact_image="settings?.data.menu_image?.url"
        ></ContactButton>

        <div @click="toggleMenu" :class="{ close: burgerMenu }" class="bx-menu-button">
          <span class="top"></span>
          <span class="middle x-1"></span>
          <span class="middle x-2"></span>
          <span class="bottom"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bx-header-container {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 8px 0;
  z-index: 9999;
  transition: background-color 0.3s ease-in-out;
  background-color: $backgroundColor;
  --content-color: #{$darkBackgroundColor};
  border-bottom: 1px solid $lightGrey;

  @media (max-width: $mobileBreakpoint) {
    padding: 6px 0;
  }

  &.transparent {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: transparent;
    --content-color: #{$whiteColor};
  border-bottom: 1px solid rgba($lightGrey, 0.1);
  }

  &.transparent:not(.scrolled) {
    .bx-logo-container {
      filter: invert(1);
    }
  }

  &.scrolled {
    background-color: $backgroundColor;
    --content-color: #{$darkBackgroundColor};

    .bx-logo-container {
      .bx-logo-text {
        transform: translate(-5px, 0);
        opacity: 0;
      }

      :deep(img) {
        width: 36px;
      }
    }
  }

  .bx-inner {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
    max-width: $boxedWidth;
    width: $relativeWidth;
    margin: auto;
  }

  .bx-menu-container {
    @media (max-width: $mobileBreakpoint) {
      display: none;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: flex;
      align-items: center;
      gap: 16px;

      li {
        position: relative;

        a {
          color: var(--content-color);
          transition: color 0.3s ease-in-out;
          cursor: pointer;
        }

        &:hover a {
          color: $linkHoverColor;
        }
      }
    }
  }

  .bx-contact-button {
    @media (max-width: $mobileBreakpoint) {
      display: none;
    }
  }

  .bx-actions-col {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 48px;
  }

  .bx-logo-container {
    cursor: pointer;
    user-select: none;
    filter: invert(0);
    transition: filter 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 8px;

    .bx-logo-text {
      font-size: 1.2rem;
      line-height: 1;
      transition: all 0.3s ease-in-out;
      transform: translate(0, 0);
      opacity: 1;
      letter-spacing: -0.02rem;
      
      strong {
        font-weight: 700;
      }

      @media(max-width: $mobileBreakpoint) {
        font-size: 1rem;
      }
    }

    a {
      display: inline-block;
    }

    :deep(img) {
      user-select: none;
      cursor: pointer;
      width: 42px;
      transition: width 0.3s ease-in-out;
      height: auto;
    }
  }

  .bx-languages-container {
    line-height: 1;
    position: relative;
    top: -2px;
    color: #fff;
    padding: 3px 6px;
    line-height: 10px;
    height: 13px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    display: flex;
    gap: 8px;
    align-items: center;

    &:hover {
      --content-color: #{$accentColor};
    }

    .bx-language-icon {
      height: 18px;
      width: 18px;
      background-color: var(--content-color);
      mask-image: url(~/assets/media/globe-icon-black.svg);
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
      transition: all 0.3s ease-in-out;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      li {
        text-transform: uppercase;

        a {
          color: var(--content-color);
          font-size: 14px;
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  .bx-menu-button {
    cursor: pointer;
    height: 44px;
    width: 44px;
    z-index: 9999;
    position: relative;

    span {
      height: 2px;
      width: 100%;
      background-color: var(--content-color);
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease-in-out;

      &.top {
        top: 16px;
      }

      &.middle {
        top: 50%;
        width: 0;
      }

      &.bottom {
        bottom: 16px;
      }
    }

    &.close span {
      &.top,
      &.bottom {
        width: 0;
      }

      &.middle {
        width: 75%;

        &.x-1 {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &.x-2 {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }
}
</style>
