
/**
 * Template Name: Gp
 * Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
 * Updated: Aug 15 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 * 
 * * Editors: Allen Kayesu, Alisa Haoken
 */

(function () { // Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope.
  "use strict"; // Enforces stricter parsing and error handling in JavaScript.

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body"); // Select the body element.
    const selectHeader = document.querySelector("#header"); // Select the header element.
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return; // Exit if the header doesn't have sticky/fixed classes.
    window.scrollY > 100 // Check if the page has been scrolled more than 100 pixels.
      ? selectBody.classList.add("scrolled") // Add 'scrolled' class if scrolled more than 100px.
      : selectBody.classList.remove("scrolled"); // Remove 'scrolled' class if scrolled less than 100px.
  }

  document.addEventListener("scroll", toggleScrolled); // Add scroll event listener to run toggleScrolled.
  window.addEventListener("load", toggleScrolled); // Run toggleScrolled once on page load.

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle"); // Select the mobile navigation toggle button.

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active"); // Toggle the 'mobile-nav-active' class on the body.
    mobileNavToggleBtn.classList.toggle("bi-list"); // Toggle the 'bi-list' icon class.
    mobileNavToggleBtn.classList.toggle("bi-x"); // Toggle the 'bi-x' icon class (close icon).
  }
  if (mobileNavToggleBtn) { // Check if the toggle button exists.
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle); // Add click event listener to toggle the mobile nav.
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => { // Select all links within the navigation menu.
    navmenu.addEventListener("click", () => { // Add click event listener to each nav link.
      if (document.querySelector(".mobile-nav-active")) { // Check if the mobile nav is currently active.
        mobileNavToogle(); // Close the mobile nav if a link is clicked.
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => { // Select all dropdown toggle elements in the nav menu.
    navmenu.addEventListener("click", function (e) { // Add click event listener to each dropdown toggle.
      e.preventDefault(); // Prevent the default link behavior.
      this.parentNode.classList.toggle("active"); // Toggle the 'active' class on the parent list item.
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active"); // Toggle the 'dropdown-active' class on the adjacent dropdown menu.
      e.stopImmediatePropagation(); // Stop the event from bubbling up further.
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader"); // Select the preloader element.
  if (preloader) { // Check if the preloader element exists.
    window.addEventListener("load", () => { // Add event listener for the window load event.
      preloader.remove(); // Remove the preloader element once the page is fully loaded.
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top"); // Select the scroll-to-top button.

  function toggleScrollTop() {
    if (scrollTop) { // Check if the scroll-to-top button exists.
      window.scrollY > 100 // Check if the page has been scrolled more than 100 pixels.
        ? scrollTop.classList.add("active") // Add 'active' class to show the button.
        : scrollTop.classList.remove("active"); // Remove 'active' class to hide the button.
    }
  }
  scrollTop.addEventListener("click", (e) => { // Add click event listener to the scroll-to-top button.
    e.preventDefault(); // Prevent the default link behavior.
    window.scrollTo({ // Smoothly scroll the window to the top.
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop); // Run toggleScrollTop on page load.
  document.addEventListener("scroll", toggleScrollTop); // Run toggleScrollTop on scroll.

  /**
   * Animation on scroll function and init
   */
  function aosInit() { // Function to initialize the AOS (Animate On Scroll) library.
    AOS.init({ // Initialize AOS with specified options.
      duration: 600, // Animation duration in milliseconds.
      easing: "ease-in-out", // Animation easing function.
      once: true, // Whether animation should happen only once.
      mirror: false, // Whether elements should animate out while scrolling past them.
    });
  }
  window.addEventListener("load", aosInit); // Initialize AOS on page load.

  /**
   * Init swiper sliders
   */
  function initSwiper() { // Function to initialize Swiper sliders.
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) { // Select all elements with the 'init-swiper' class.
      let config = JSON.parse( // Parse the configuration JSON from the '.swiper-config' element.
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) { // Check if it's a tabbed swiper.
        initSwiperWithCustomPagination(swiperElement, config); // Initialize with custom pagination (function assumed to exist elsewhere).
      } else {
        new Swiper(swiperElement, config); // Initialize a standard Swiper instance.
      }
    });
  }

  window.addEventListener("load", initSwiper); // Initialize Swiper sliders on page load.

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({ // Initialize GLightbox for image and video popups.
    selector: ".glightbox", // CSS selector for elements to be handled by GLightbox.
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) { // Select all elements with the 'isotope-layout' class.
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry"; // Get layout mode from data attribute, default to 'masonry'.
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*"; // Get default filter from data attribute, default to '*'.
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order"; // Get sorting method from data attribute, default to 'original-order'.

    let initIsotope; // Variable to hold the Isotope instance.
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () { // Wait for images within the container to load.
      initIsotope = new Isotope( // Initialize Isotope on the container.
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item", // Selector for items within the Isotope layout.
          layoutMode: layout, // Set the layout mode.
          filter: filter, // Set the initial filter.
          sortBy: sort, // Set the sorting method.
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li") // Select all filter list items.
      .forEach(function (filters) {
        filters.addEventListener( // Add click event listener to each filter item.
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active") // Find the currently active filter.
              .classList.remove("filter-active"); // Remove the 'filter-active' class.
            this.classList.add("filter-active"); // Add 'filter-active' class to the clicked filter.
            initIsotope.arrange({ // Re-arrange the Isotope layout based on the new filter.
              filter: this.getAttribute("data-filter"), // Get the filter value from the data attribute.
            });
            if (typeof aosInit === "function") { // Check if aosInit function exists.
              aosInit(); // Re-initialize AOS animations after filtering.
            }
          },
          false
        );
      });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter(); // Initialize PureCounter for number animations.

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) { // Add event listener for the window load event.
    if (window.location.hash) { // Check if the URL contains a hash.
      if (document.querySelector(window.location.hash)) { // Check if an element with the hash ID exists.
        setTimeout(() => { // Use setTimeout to ensure layout calculations are complete.
          let section = document.querySelector(window.location.hash); // Select the target section.
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop; // Get the computed scroll-margin-top style.
          window.scrollTo({ // Scroll to the section, adjusting for the scroll margin.
            top: section.offsetTop - parseInt(scrollMarginTop), // Calculate the target scroll position.
            behavior: "smooth", // Use smooth scrolling animation.
          });
        }, 100); // Delay execution slightly (100ms).
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a"); // Select all links within the navmenu.

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => { // Iterate over each nav link.
      if (!navmenulink.hash) return; // Skip links without a hash.
      let section = document.querySelector(navmenulink.hash); // Select the section corresponding to the link's hash.
      if (!section) return; // Skip if the section doesn't exist.
      let position = window.scrollY + 200; // Calculate the current scroll position plus an offset.
      if (
        position >= section.offsetTop && // Check if the scroll position is within the section's bounds.
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active") // Find any currently active nav links.
          .forEach((link) => link.classList.remove("active")); // Remove 'active' class from them.
        navmenulink.classList.add("active"); // Add 'active' class to the current link.
      } else {
        navmenulink.classList.remove("active"); // Remove 'active' class if not within the section.
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy); // Run scrollspy on page load.
  document.addEventListener("scroll", navmenuScrollspy); // Run scrollspy on scroll events.
})(); // End of IIFE.

// video decision logic
const video = document.querySelector("#mainVideo video"); // Get the main video element within the #mainVideo container.
const choices = document.getElementById("choices"); // Get the div element containing the choice buttons.

video.addEventListener("ended", () => { // Add an event listener for when the video finishes playing.
  // Only show choices if it's the main video that just ended.
  if (video.currentSrc.includes("mainVideo.mp4")) { // Check if the source of the ended video is the main one.
      choices.style.display = "flex"; // Display the choice buttons using flex layout.
  }
});

// Add event listeners to the choice buttons (assuming buttons call this function via onclick="playVideo('left')" etc.)
// This function plays the corresponding video based on the chosen direction.
function playVideo(direction) {
  let videoSource = ""; // Initialize a variable to hold the video source path.

  // Determine the video source based on the user's choice ("left" or "right").
  if (direction === "left") { // If the user chose 'left'.
    videoSource = "./assets/video/left_be_happy.mp4"; // Set the source to the 'left' video.
  } else if (direction === "right") { // If the user chose 'right'.
    videoSource = "./assets/video/right_fit_in_to_society.mp4"; // Set the source to the 'right' video.
  }

  // Load and play the selected video.
  video.src = videoSource; // Set the video element's source to the chosen path.
  video.load(); // Load the new video source.
  video.play(); // Play the loaded video.

  // Hide choices again while the chosen video plays.
  choices.style.display = "none"; // Hide the choice buttons.

  // Set up an event listener for when the *alternate* video ends.
  video.onended = () => { // Define what happens when the currently playing (alternate) video ends.
    video.src = "./assets/video/mainVideo.mp4"; // Reset the video source back to the main video.
    video.load(); // Load the main video.
    video.pause(); // Pause the main video immediately (user must click play).
    window.location.href = "#video"; // Scroll the page focus back to the video section using its ID.
  };
}