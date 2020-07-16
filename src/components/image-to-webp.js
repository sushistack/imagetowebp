import { main, File } from 'magica'
import { saveAs } from 'file-saver'
import imageUploader from './image-uploader'
import preview from './preview'
import convertedList from './coverted-list'
import qualityRange from './quality-range'
import JSZip from 'jszip'
import logo from './logo'

class ImageToWebp {
  constructor () {
    this.isProcessedAll = false
    this.quality = 0.8
    this.outputs = []
    this.fr = new FileReader()
    this.resetButton = document.getElementById('reset-btn')
    this.convertButton = document.getElementById('convert-btn')
    this.downloadToZipButton = document.getElementById('download-zip-btn')
    this.resetButton.addEventListener('click', this.reset.bind(this))
    this.convertButton.addEventListener('click', this.convert.bind(this))
    this.downloadToZipButton.addEventListener('click', this.downloadToZip.bind(this))
    this.successAlert = document.querySelector('.alert-success');
  }

  reset () {
    this.outputs = [];
    imageUploader.input.value = '';
    preview.removeAll();
    imageUploader.inactive(false);
    this.inactivateButtons(true);
    convertedList.reset();
    this.downloadToZipButton.classList.remove('active');
    this.successAlert.classList.remove('active');
    qualityRange.inactivate(true);
  }

  inactivateButtons (disabled) {
    this.resetButton.disabled = disabled;
    this.convertButton.disabled = disabled;
  }

  convert () {
    this.readImageBuffer(imageUploader.input.files, 0);
  }

  readImageBuffer (files, index) {
    var file = files[index];
    this.fr.onload = async function(e) {
      var name = file.name.substring(0, file.name.lastIndexOf('.'))
      var ext = file.name.substring(file.name.lastIndexOf('.') + 1)
      var quality = `${this.quality * 100}%`
      
      var options = {
        debug: false,
        command: `convert ${name}.${ext} -quality ${quality} -define webp:lossless=true ${name}.webp`,
        inputFiles: [ new File(file.name, new Uint8ClampedArray(e.target.result)) ]
      }

      const result = await main(options)

      this.outputs.push({
        name: `${name}.webp`,
        type : 'image/webp',
        blob: new Blob([result.outputFiles[0].content], { type : 'image/webp' })
      })

      convertedList.appendResizedItem(`${name}.webp`, index)

      if (index < files.length - 1) {
        this.readImageBuffer(files, index + 1);
      } else {
        this.downloadToZipButton.classList.add('active');
        this.successAlert.classList.add('active');
        this.convertButton.disabled = true;
        qualityRange.inactivate(true)
      }
    }.bind(this);


    
    this.fr.readAsArrayBuffer(file);
  }

  downloadToZip () {
    if (this.outputs.length === 0) return
    var zip = new JSZip()
    this.outputs.forEach(o => {
      zip.file(o.name, o.blob)
    })
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
        saveAs(content, "image-to-webp.zip");
      })
  }

}

const instance = new ImageToWebp()

export default instance