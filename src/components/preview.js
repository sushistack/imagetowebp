class Preview {
  constructor () {
    this.previewWrap = document.querySelector('.preview-wrapper')
  }

  createCard (src, name) {
    var img = document.createElement('div');
    var card = document.createElement('div');
    var wrap = document.createElement('div');
    var badge = document.createElement('div');
    img.className = 'img-fluid';
    img.style.backgroundImage = 'url(' + src + ')';
    card.className = 'card img-wrapper';
    wrap.className = 'img-outer';
    badge.className = 'name-badge';
    badge.textContent = name;
    card.appendChild(badge);
    card.appendChild(img);
    wrap.appendChild(card);
    return wrap;
  }

  appendCard (card) {
    this.previewWrap.appendChild(card);
  }

  removeAll () {
    var len = this.previewWrap.childElementCount;
    while (len) {
      this.previewWrap.removeChild(
        this.previewWrap.firstElementChild
      );
      len = this.previewWrap.childElementCount;
    }
  }

}

const instance = new Preview()

export default instance