<script setup lang="ts">
const settings = useSettings();
const alternateLanguages = useAlternateLanguages();
const localePath = useLocalePath();
</script>

<template>
  <div class="bx-footer-container">
    <div class="bx-boxed">
      <PrismicImage class="bx-logo" v-if="settings?.data.logo.url" :field="settings?.data.logo"></PrismicImage>

      <div class="bx-company animate--slide-in scroll-trigger" data-cascade>
        {{ settings?.data.company }}
      </div>
      <div class="bx-address animate--slide-in scroll-trigger" data-cascade>
        {{ settings?.data.address }}
      </div>
      <div
        class="bx-telephone animate--slide-in scroll-trigger"
        v-if="!!settings?.data.contact_telephone"
        data-cascade
      >
        <a :href="'tel:' + settings?.data.contact_telephone">{{
          settings?.data.contact_telephone
        }}</a>
      </div>

      <div class="bx-email-button animate--slide-in scroll-trigger" data-cascade>
        <a :href="'mailto:' + settings?.data.contact_email">{{
          settings?.data.contact_email
        }}</a>
      </div>

      <div
        v-if="
          settings?.data.social_media_links &&
          settings?.data.social_media_links.length > 0
        "
        class="bx-social-media-menu"
      >
        <ul>
          <li
            v-for="link in settings?.data.social_media_links"
            class="animate--slide-in scroll-trigger"
            data-cascade
          >
            <PrismicLink :field="link.url">{{ link.name }}</PrismicLink>
          </li>
        </ul>
      </div>

      <div class="bx-legal-row-container animate--slide-in scroll-trigger" data-cascade>
        <div class="bx-copyright">
          © {{ new Date().getFullYear() }} {{ settings?.data.copyright }}
        </div>

        <div class="bx-legal-menu-container">
          <ul>
            <li v-for="(link, index) in settings?.data.legal_menu" :key="index">
              <PrismicLink :field="link"></PrismicLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bx-footer-container {
  background-color: $whiteColor;
  padding: 48px 0 36px;
  overflow: hidden;
  --content-color: #{$blackColor};
  color: var(--content-color);
  border-top: 1px solid $lightGrey;

  @media (max-width: $mobileBreakpoint) {
    padding: 36px 0;
  }

  .bx-logo {
    width: auto;
    height: 38px;
    margin-bottom: 32px;
  }

  .bx-company {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 18px;

    @media (max-width: $mobileBreakpoint) {
      margin-bottom: 5px;
      font-size: 15px;
    }
  }

  .bx-address {
    font-size: 16px;
    text-transform: uppercase;
    
    @media (max-width: $mobileBreakpoint) {
      font-size: 14px;
    }
  }

  .bx-email-button {
    margin: 56px 0;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 36px;
    font-size: 20px;
    white-space: nowrap;

    &:hover {
      --content-color: #{$brandColor};
    }

    @media (max-width: $mobileBreakpoint) {
      gap: 12px;
      font-size: 18px;
    }

    &:before {
      content: "";
      height: 25px;
      width: 25px;
      mask-image: url(../assets/media/arrow-top-right.svg);
      mask-position: center;
      mask-repeat: no-repeat;
      mask-size: contain;
      background-color: var(--content-color);
      transition: all 0.3s ease-in-out;

      @media (max-width: $mobileBreakpoint) {
        width: 18px;
        height: 18px;
      }
    }
  }

  .bx-social-media-menu {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 20px;

      li a {
        font-size: 16px;

        @media (max-width: $mobileBreakpoint) {
          font-size: 14px;
        }
      }
    }
  }

  .bx-legal-row-container {
    display: flex;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 12px;
    margin-top: 80px;
    gap: 8px;
    align-items: flex-start;

    @media (max-width: $mobileBreakpoint) {
      font-size: 10px;
      margin-top: 50px;
    }

    .bx-copyright {
      flex: 1;
    }

    .bx-legal-menu-container {
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 20px;

        @media (max-width: $mobileBreakpoint) {
          gap: 8px;
        }

        li a {
          font-size: inherit;
          font-weight: inherit;
        }
      }
    }
  }
}
</style>
