<template>
    <div class="carousel-image-container relative" :class="isMobile ? 'h-96 w-screen': 'h-screen'">
      <!-- Carousel image-->
      <img id="carousel-img-id" class="absolute h-full w-full" :src="getCarouselImgUrl(imgIndex)" alt="Concept art for Secretly Abandoned Spaces">
      <!-- Carousel prev & next buttons-->
      <div id="carousel-nav-btns" class="absolute left-0 top-1/2 transform -translate-y-1/2"> <!-- Prev button-->
        <button @click="btnPrev()" class="carousel-nav">
          <svg class="fill-white h-16 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
      </div>
      <div id="carousel-nav-btns" @click="btnNext()" class="absolute right-0 top-1/2 transform -translate-y-1/2"> <!-- Next button-->
        <button class="carousel-nav">
          <svg class="fill-white h-16 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        isMobile: {
            type: Boolean,
            required: true
        }
    },

    data: function() {
        return {
          imgIndex: 1,
          rotateImg: null,
        };
    },

    methods: {
        // get image URL for the carousel images
        getCarouselImgUrl(pic) {
        this.heroImage = this.isMobile ? 'hero-0'+pic+'-sm.jpg' : 'hero-0'+pic+'-lg.jpg'
        return new URL(`../assets/${this.heroImage}`, import.meta.url).href
        },

        // update the carousel image when user clicks the previous nav button
        btnPrev() {
        this.imgIndex = this.imgIndex <= 1 ? 4 : this.imgIndex - 1
        document.getElementById("carousel-img-id").src = this.getCarouselImgUrl(this.imgIndex)
        },

        // update the carousel image when user clicks the next nav button
        btnNext() {
        this.imgIndex = this.imgIndex >= 4 ? 1 : this.imgIndex + 1
        document.getElementById("carousel-img-id").src = this.getCarouselImgUrl(this.imgIndex)
        },

        // update the carousel image when user clicks a carousel button
        btnUpdateImg(idx) {
        this.imgIndex = idx+1
        document.getElementById("carousel-img-id").src = this.getCarouselImgUrl(this.imgIndex)
        },

        rotateCarousel: function () {
          var carousel = this;
          const rotateImg = setInterval(function () {
            carousel.imgIndex = carousel.imgIndex >= 4 ? 1 : carousel.imgIndex + 1
            if (document.getElementById("carousel-img-id")) {
              document.getElementById("carousel-img-id").src = carousel.getCarouselImgUrl(carousel.imgIndex)
            }
          }, 15000);
          this.rotateImg = rotateImg
        }
    },
    mounted () {
      this.imgIndex = 1
      this.getCarouselImgUrl(this.imgIndex)
      this.rotateCarousel()
    },
    unmounted () {
        clearInterval(this.rotateImg)
    }

}
</script>


<style scoped>
  /* don't show carousel buttons on mobile devices */
  @media (min-width: 1024px) {
    .carousel-image-container:hover #carousel-nav-btns {
        display: flex;
    }
  }

  /* only show the carousel buttons on hover */
  .carousel-image-container #carousel-nav-btns {
    display: none;
  }

  /* styling for previous and next buttons in the hero image */
  .carousel-nav {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
  }
  .carousel-nav:hover {
    opacity: 0.5;
  }

</style>
