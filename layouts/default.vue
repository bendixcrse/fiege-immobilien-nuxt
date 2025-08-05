<template>
    <div class="bx-basic-layout-container">
      <Header />
      <BurgerMenu />

      <main>
        <slot />
      </main>
      
      <Footer />
    </div>
</template>

<style>
main {
  min-height: 80svh;
}
</style>