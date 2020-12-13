class Logo {
  constructor () {
    this.logo = document.querySelector('.logo')
    this.dropdown = document.querySelector('.dropdown-menu')
    this.logo.addEventListener('mouseover', function () { this.dropdown.classList.add('show') }.bind(this))
    this.logo.addEventListener('mouseout', function () { this.dropdown.classList.remove('show'); }.bind(this))
    this.dropdown.addEventListener('mouseover', function () { this.dropdown.classList.add('show') }.bind(this))
    this.dropdown.addEventListener('mouseout', function () { this.dropdown.classList.remove('show') }.bind(this))
  }
}

const instance = new Logo();

export default instance;