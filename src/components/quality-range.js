import imageToWebp from './image-to-webp'

class QualityRange {
  constructor () {
    this.qualityOutput = document.getElementById('output')
    this.qualityRange = document.getElementById('quality')
    this.qualityRange.addEventListener('input', function (e) {
      this.qualityOutput.value = e.target.value;
      imageToWebp.quality = parseFloat(e.target.value);
    }.bind(this));
  }

  inactivate (disabled) {
    imageToWebp.quality = this.qualityRange.value = this.qualityOutput.value = 0.8
    this.qualityRange.disabled = disabled
  }

}

const instance = new QualityRange()

export default instance
