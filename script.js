// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar")
  const logoText = document.getElementById("logo-text")
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")

  // Enhanced navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white", "shadow-xl")
      navbar.classList.remove("gradient-bg")
      logoText.classList.remove("text-white")
      logoText.classList.add("text-primary")

      // Update nav links color
      const navLinks = navbar.querySelectorAll("a:not(.mobile-menu a)")
      navLinks.forEach((link) => {
        link.classList.remove("text-white")
        link.classList.add("text-gray-700")
      })
    } else {
      navbar.classList.remove("bg-white", "shadow-xl")
      navbar.classList.add("gradient-bg")
      logoText.classList.add("text-white")
      logoText.classList.remove("text-primary")

      // Revert nav links color
      const navLinks = navbar.querySelectorAll("a:not(.mobile-menu a)")
      navLinks.forEach((link) => {
        link.classList.add("text-white")
        link.classList.remove("text-gray-700")
      })
    }
  })

  // Mobile menu toggle
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    const icon = mobileMenuButton.querySelector("i")

    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    } else {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    }
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      mobileMenu.classList.add("hidden")
      const icon = mobileMenuButton.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up")
      }
    })
  }, observerOptions)

 

  

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  })

  const statsSection = document.querySelector(".grid.grid-cols-3.gap-8")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }

  // Button click handlers with enhanced feedback
  const ctaButtons = document.querySelectorAll("button")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)

      // Handle different button actions
      if (
        this.textContent.includes("Get Started") ||
        this.textContent.includes("Schedule") ||
        this.textContent.includes("Quote")
      ) {
        // Simulate form opening
        showNotification("Contact form would open here", "info")
      } else if (this.textContent.includes("Demo")) {
        showNotification("Demo video would play here", "success")
      }
    })
  })

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
      type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
    } text-white`
    notification.textContent = message

    document.body.appendChild(notification)

    // Slide in
    setTimeout(() => {
      notification.classList.remove("translate-x-full")
    }, 100)

    // Slide out and remove
    setTimeout(() => {
      notification.classList.add("translate-x-full")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

   
  // Add floating animation to cards
  const floatingCards = document.querySelectorAll(".group")
  floatingCards.forEach((card) => {
    card.classList.add("hover-float")
  })

 

  images.forEach((img) => {
    img.classList.add("opacity-0", "transition-opacity", "duration-500")
    imageObserver.observe(img)
  })

  // Typing effect for hero title (optional enhancement)
  const heroTitle = document.querySelector("h1")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000)
  }

  // Smooth reveal animations on scroll
  const revealElements = document.querySelectorAll(".group, section")
  revealElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`
  })
})

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Create loading overlay
  const loadingOverlay = document.createElement("div")
  loadingOverlay.className =
    "fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500"
  loadingOverlay.innerHTML = `
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">Loading...</p>
    </div>
  `

  document.body.prepend(loadingOverlay)

  // Remove loading overlay
  setTimeout(() => {
    loadingOverlay.style.opacity = "0"
    setTimeout(() => {
      loadingOverlay.remove()
    }, 500)
  }, 1000)
})
