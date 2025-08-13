<template>
    <div class="bx-basic-layout-container">
      <Header />
      <BurgerMenu />

      <slot />
      
      <Footer />
    </div>
</template>

<style>
main {
  min-height: 60svh;
}
</style>