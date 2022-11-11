<template>
    <header class="top-0 left-0 z-40 fixed bg-neutral-700/50 w-full">
      <nav class="container-inner mx-auto flex flex-wrap justify-between items-center">
        <div>
          <router-link to="/" @click.native="scrollToTop">
            <div class="text-xl sm:text-2xl font-semibold text-white text-center py-6 lg:px-4 lg:py-6">Secretly Abandoned Spaces</div>
          </router-link>
        </div>
        <div v-if="!isOpen" class="block lg:hidden z-10"> <!-- Burger -->
          <button @click="toggleBurger" class="flex items-center">
            <svg class="h-6 w-6 fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div v-else class="block lg:hidden z-20"> <!-- Close (x) -->
          <button @click="toggleBurger" class="flex items-center">
            <svg class="h-8 w-8 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
        <ul class="nav-btn-container uppercase tracking-wide font-bold space-y-2 lg:space-y-0 pb-4 lg:pb-0" :class="isOpen ? 'absolute right-0 top-0': 'hidden lg:flex'">
          <li><router-link to="/" @click="scrollToTop"><div class="nav-btn py-2 px-4 lg:py-3">Home</div></router-link></li>
          <li><router-link to="/about" @click="scrollToTop"><div class="nav-btn py-2 px-4 lg:py-3">About</div></router-link></li>
          <li><router-link to="/design" @click="scrollToTop"><div class="nav-btn py-2 px-4 lg:py-3">Design</div></router-link></li>
          <li><router-link to="/team" @click="scrollToTop"><div class="nav-btn py-2 px-4 lg:py-3">Team</div></router-link></li>
          <li><router-link to="/" @click="donateNow"><div class="nav-btn lg:border lg:border-white py-2 px-4 lg:py-3">Donate</div></router-link></li>
        </ul>
      </nav>
    </header>
</template>

<script>
  export default {
    name: 'AppHeader',

    data() {
      return {
        isOpen: false,
      }
    },
    methods: {
      scrollToTop() {
        this.isOpen = false
        window.scrollTo(0,0);
      },
      toggleBurger() {
        this.isOpen = !this.isOpen
      },
      donateNow() {
        window.open("https://www.gofundme.com/f/secretly-abandoned-spaces", "_blank");
      },
    }
  }
</script>


<style scoped>
  .nav-btn-container {
    font-size: 1.00rem;
    width: auto;
    flex: 0 1 auto;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media screen and (max-width: 950px) {
    .nav-btn-container {
      font-size: 1.25rem;
      width: 14rem;
      height: 100vh;
      padding: 4.25rem 0.625rem;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }



  .nav-btn {
    color: theme('colors.white');
  }
  .nav-btn:hover {
    background-color: theme('colors.neutral.500');
  }
</style>
