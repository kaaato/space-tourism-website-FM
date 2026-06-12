const spaceTourism = {
  openButton: document.querySelector('.btn-open-header-menu'),
  closeButton: document.querySelector('.btn-close-mobile-menu'),
  menu: document.querySelector('.mobile-menu'),
  tablist: document.querySelector('[role="tablist"]'),
  tabs: document.querySelectorAll('[role="tab"]'),
  tabpanels: document.querySelectorAll('[role="tabpanel"]'),
  images: document.querySelectorAll('[data-img-item]'),
  currentIndex: '0',

  init() {
    if (this.tablist) {
      this.tablist.addEventListener('click', this.handleClickOnTabs.bind(this));
    }
    this.openButton.addEventListener('click', this.openMenu.bind(this));
    this.closeButton.addEventListener('click', this.closeMenu.bind(this));
    window.addEventListener('keydown', this.changeTabStateByKeyboard.bind(this));
  },
  
  changeTabStateByKeyboard(event) {
    if (event.target !== this.tablist) return;
    const currentBtn = this.tablist.querySelector('[aria-selected="true"]');

    if (event.code === 'ArrowRight') {
      if (currentBtn.dataset.tabItem === String(this.tabs.length - 1)) {
        this.currentIndex = '0';
      } else {
        this.currentIndex = String(Number(currentBtn.dataset.tabItem) + 1);
      }
    } else if (event.code === 'ArrowLeft') {
      if(currentBtn.dataset.tabItem === '0') {
        this.currentIndex = String(this.tabs.length - 1);
      } else {
        this.currentIndex = String(Number(currentBtn.dataset.tabItem) - 1);
      }
    }
    this.changeTabState(this.currentIndex);
  },

  handleClickOnTabs(event) {
    const button = event.target.closest('[role="tab"]');
    if (!button || button.hasAttribute('aria-selected')) return;
    this.tablist.focus();
    this.currentIndex = button.dataset.tabItem;

    this.changeTabState(this.currentIndex);
  },
  
  changeTabState(i) {
    for (let tab of this.tabs) {
      if (tab.dataset.tabItem === i) {
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.removeAttribute('aria-selected');
      }
    }
  
    for (let tabpanel of this.tabpanels) {
      if (tabpanel.dataset.tabpanelItem === i) {
        tabpanel.removeAttribute('aria-hidden');
      } else {
        tabpanel.setAttribute('aria-hidden', 'true');
      }
    }
  
    for (let img of this.images) {
      if (img.dataset.imgItem === i) {
        img.removeAttribute('aria-hidden');
      } else {
        img.setAttribute('aria-hidden', 'true');
      }
    }
  },

  openMenu() {
    this.menu.dataset.mobileMenuState = 'true';
    this.openButton.setAttribute('aria-expanded', 'true');
    this.closeButton.focus();

    this.handleKeyDownOnEscape = this.closeMenuByEscape.bind(this);
    window.addEventListener('keydown', this.handleKeyDownOnEscape);
    this.handleResize = this.closeMenu.bind(this);
    window.addEventListener('resize', this.handleResize);
  },

  closeMenu() {
    this.menu.dataset.mobileMenuState = 'false';
    this.openButton.setAttribute('aria-expanded', 'false');
    this.openButton.focus();

    window.removeEventListener('keydown', this.handleKeyDownOnEscape);
    window.removeEventListener('resize', this.handleResize);
  },

  closeMenuByEscape(event) {
    if (event.key === 'Escape') {
      console.log(this)
      this.closeMenu();
    }
  },
}

spaceTourism.init();
