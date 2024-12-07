class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      const response = await fetch("components/sidebar.html");
      const html = await response.text();
      this.innerHTML = html;

      // Wait for the DOM to be ready
      setTimeout(() => {
        this.initializeSidebar();
      }, 0);
    } catch (error) {
      console.error("Error loading sidebar template:", error);
    }
  }

  initializeSidebar() {
    const $sidebar = $(this.querySelector("#sidebar"));
    const $sidebar_inner = $sidebar.children(".inner");

    // Re-initialize the sidebar functionality
    // Menu
    const $menu = $("#menu");
    const $menu_openers = $menu.children("ul").find(".opener");

    $menu_openers.each(function () {
      const $this = $(this);

      $this.on("click", function (event) {
        event.preventDefault();
        $menu_openers.not($this).removeClass("active");
        $this.toggleClass("active");
      });
    });

    // Other initialization code from main.js that's relevant to the sidebar
    // For example, the toggle functionality:
    $('<a href="#sidebar" class="toggle">Toggle</a>')
      .appendTo($sidebar)
      .on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $sidebar.toggleClass("inactive");
      });

    // Breakpoint-specific behavior
    if (window.breakpoints) {
      breakpoints.on("<=large", function () {
        $sidebar.addClass("inactive");
      });

      breakpoints.on(">large", function () {
        $sidebar.removeClass("inactive");
      });
    }
  }
}

customElements.define("sidebar-component", Sidebar);
