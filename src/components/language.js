class Language {
  constructor() {
    this.langs = document.getElementsByClassName('language-link')
    this.languageBoxButton = document.getElementById('language-box-button')
    this.languageMenu = document.getElementById('langauge-menu')
    this.searchInput = document.getElementById('lang-search')
    this.searchInput.addEventListener('click', e => { e.stopPropagation() })
    this.searchInput.addEventListener('input', e => { this.search(e.target.value) })
    this.languageBoxButton.addEventListener('click', e => {
      this.toogleBox()
      e.stopPropagation()
    })
    window.addEventListener('click', e => {
      if (!this.languageMenu.classList.contains('show')) return
      if (e.target !== this.languageMenu ||
        e.target !== this.languageBoxButton ||
        e.target !== this.searchInput) {
        this.toogleBox();
      }
    })
    
  }

  toogleBox () {
    if (this.languageMenu.classList.contains('show')) {
      this.languageMenu.classList.remove('show');
    } else {
      this.languageMenu.classList.add('show');
    }
  }

  search (keyword) {
    for (var i = 0; i < this.langs.length; i += 1) {
      if (keyword === '') {
        this.langs[i].classList.add('show')  
      } else {
        if (this.langs[i].textContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          this.langs[i].classList.add('show')
        } else {
          this.langs[i].classList.remove('show')
        }
      }
    }
  }
}

export default new Language()