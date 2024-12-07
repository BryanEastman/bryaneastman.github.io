class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <!-- Sidebar -->
      <div id="sidebar">
          <div class="inner">
              <!-- Menu -->
              <nav id="menu">
                  <header class="major">
                      <h2>Menu</h2>
                  </header>
                  <ul>
                      <li><a href="index.html">Homepage</a></li>
                      <!-- <li><a href="generic.html">Generic</a></li>
                      <li><a href="elements.html">Elements</a></li> -->
                      <li>
                          <span class="opener">Projects</span>
                          <ul>
                              <li>
                                  <a href="CallAudits.html"
                                      >Quality Assurance App</a
                                  >
                              </li>
                              <!-- <li><a href="#">Ipsum Adipiscing</a></li>
                              <li><a href="#">Tempus Magna</a></li>
                              <li><a href="#">Feugiat Veroeros</a></li> -->
                          </ul>
                      </li>
                  </ul>
              </nav>

              <!-- Section -->
              <section>
                  <header class="major">
                      <h2>Get in touch</h2>
                  </header>
                  <p>
                      Looking to connect? I am excited to network with
                      others in the I/O and People Analytics space, be it
                      collaborating on projects, providing advice, or just
                      connecting over coffee!
                  </p>
                  <ul class="contact">
                      <li class="icon solid fa-envelope">
                          <a href="#">BryanEastman@proton.me</a>
                      </li>
                      <li class="icon solid fa-phone">(313) 649-7961</li>
                      <li class="icon solid fa-home">Detroit, MI</li>
                  </ul>
              </section>

              <!-- Footer -->
              <footer id="footer"></footer>
          </div>
      </div>
  </div>
      `;

    // Wait for the DOM to be ready
    setTimeout(() => {
      this.initializeSidebar();
    }, 0);
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
