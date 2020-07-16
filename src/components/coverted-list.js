import imageToWebp from './image-to-webp'

class ConvertedList {
  constructor () {
    this.imageIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6c757d" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>';
    this.downloadIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 20h3v-5h2v5h3l-4 4-4-4zm11.479-12.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z"/></svg>';
    this.compressedList = document.querySelector('.converted .list-group');
    this.listLoader = document.createElement('li');
    this.listLoader.className = 'list-group-item';
    this.listLoader.id = 'list-loader';
    this.listLoader.innerHTML = '<div class="loader"></div>';
    this.isLoading = false;
  }

  activeLoading (active) {
    if (active && !this.isLoading) {
      this.isLoading = true;
      this.compressedList.appendChild(this.listLoader);
    }

    if (!active && this.isLoading) {
      this.isLoading = false;
      this.compressedList.removeChild(this.listLoader);
    }
  }

  appendResizedItem (name, index) {
    var item = this.createResizedItem(name, index)
    this.compressedList.insertBefore(item, this.listLoader)
  }

  reset () {
    var len = this.compressedList.childElementCount
    while (len) {
      this.compressedList.removeChild(this.compressedList.firstElementChild)
      len = this.compressedList.childElementCount
    }
    this.activeLoading(false);
  }

  createResizedItem (name, index) {
    var imageNewTab = document.createElement('a');
    imageNewTab.className = 'image-new-tab';
    imageNewTab.textContent = name;
    imageNewTab.setAttribute('image-index', index);
    imageNewTab.addEventListener('click', this.openImageInNewTab.bind(this))
    var downloadEachBtn = document.createElement('a');
    downloadEachBtn.className = 'download-each-btn';
    downloadEachBtn.setAttribute('image-index', index);
    downloadEachBtn.innerHTML = this.downloadIcon;
    downloadEachBtn.addEventListener('click', this.downloadEachImage.bind(this))
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = this.imageIcon;
    li.appendChild(imageNewTab);
    li.appendChild(downloadEachBtn);
    return li;
  }

  openImageInNewTab (e) {
    var index = parseInt(e.target.getAttribute('image-index'), 10)
    var output = imageToWebp.outputs[index]

    imageToWebp.fr.onload = function (e) {
      var image = new Image()
      image.src = e.target.result
      var w = window.open('')
      w.document.write(image.outerHTML)
    }
    imageToWebp.fr.readAsDataURL(output.blob);
  }

  downloadEachImage (e) {
    var target = e.target;
    if (e.target.tagName === 'svg') {
      target = e.target.parentElement;
    } else if (e.target.tagName === 'path') {
      target = e.target.parentElement.parentElement;
    }
    
    var index = parseInt(target.getAttribute('image-index'), 10)
    var output = imageToWebp.outputs[index]

    this.download(output.blob, output.name)
  }

  download (blob, name) {
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(blob, name);
    } else {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

}

export default new ConvertedList()