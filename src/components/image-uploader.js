import imageToWebp from './image-to-webp'
import qualityRange from './quality-range'
import preview from './preview'

class ImageUploader {
  constructor () {
    this.input = document.getElementById('images')
    this.fileUploader = document.querySelector('.file-upload-wrapper')
    this.input.addEventListener('change', this.onImageUploaded.bind(this))
  }

  reset () {
    this.inactive(false);
    this.input = [];
  }

  inactive (disabled) {
    if (disabled) {
      this.fileUploader.classList.remove('active');
    } else {
      this.fileUploader.classList.add('active');
    }
  }

  onImageUploaded (e) {
    preview.removeAll();
    this.readFile(e.target.files, 0);
    imageToWebp.inactivateButtons(false);
    qualityRange.inactivate(false);
    this.inactive(true);
  }

  readFile (files, index) {
    var file = files[index];
    imageToWebp.fr.onload = function(e) {
      var content = e.target.result;
      var cardwrap = preview.createCard(content, file.name)
      preview.appendCard(cardwrap);
      if (index < files.length - 1) this.readFile(files, index + 1);
    }.bind(this);
    imageToWebp.fr.readAsDataURL(file);
  }
}

const instance = new ImageUploader()

export default instance