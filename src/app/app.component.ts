import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';

import Cropper from 'cropperjs';

@Component({
  selector: 'attachments-editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @ViewChild('photo')
  private elPhoto: ElementRef;

  @ViewChild('result')
  private elResult: ElementRef;

  @ViewChild('inputFile')
  private elInputFile: ElementRef;

  private cropper;
  private result;
  private data;
  private options;
  private image;

  private scaleXValue = 1;
  private scaleYValue = 1;

  ngOnInit() {
    this.image = this.elPhoto.nativeElement;
    this.result = this.elResult.nativeElement;

    this.options = {
      aspectRatio: 1 / 1,
      viewMode: 1,
      autoCrop: false,
      minCropBoxWidth: 100,
      minCropBoxHeight: 100,
      ready: function () {
        croppable = true;
        this.cropper.crop();
        this.cropper.setCropBoxData({
          width: 150,
          height: 150
        });
      }
    };

    var croppable = false;
    this.cropper = new Cropper(this.image, this.options);
  }

  makeCrop() {
    var img = this.cropper.getCroppedCanvas({
      width: 250,
      height: 250
    });
    this.data = img.toDataURL();
    this.result.src = this.data;
  }

  setDragMode(dragMode: string) {
    var img = this.cropper.setDragMode(dragMode)
  }

  rotateRight() {
    var img = this.cropper.rotate(45)
  }

  rotateLeft() {
    var img = this.cropper.rotate(-45)
  }

  zoomIn() {
    var img = this.cropper.zoom(0.1)
  }

  zoomOut() {
    var img = this.cropper.zoom(-0.1)
  }

  move(moveDegreeValue1: number, moveDegreeValue2: number) {
    var img = this.cropper.move(moveDegreeValue1, moveDegreeValue2)
  }

  scaleX(scaleXDegree: number) {
    var img;
    if (this.scaleXValue != scaleXDegree) {
      this.scaleXValue = scaleXDegree;
      img = this.cropper.scaleX(scaleXDegree)
    }
    else {
      this.scaleXValue = 1;
      img = this.cropper.scaleX(this.scaleXValue)
    }
  }

  scaleY(scaleYDegree: number) {
    var img;
    if (this.scaleYValue != scaleYDegree) {
      this.scaleYValue = scaleYDegree;
      img = this.cropper.scaleY(scaleYDegree)
    }
    else {
      this.scaleYValue = 1;
      img = this.cropper.scaleY(this.scaleYValue)
    }
  }

  crop() {
    var img = this.cropper.crop()
  }

  clear() {
    var img = this.cropper.clear()
  }

  disable() {
    var img = this.cropper.disable()
  }

  enable() {
    var img = this.cropper.enable()
  }

  reset() {
    var img = this.cropper.reset()
  }

  destroy() {
    var img = this.cropper.destroy()
  }

  changeImage(event) {
    var files = event.srcElement.files;
    var file;

    var uploadedImageType = 'image/jpeg';
    var uploadedImageURL;
    var URL = window.URL || (window as any).webkitURL;

    if (files && files.length) {
      file = files[0];

      if (/^image\/\w+/.test(file.type)) {
        uploadedImageType = file.type;
        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
        }
        this.image.src = uploadedImageURL = URL.createObjectURL(file);
        this.cropper.destroy();
        this.cropper = new Cropper(this.image, this.options);
      } else {
        window.alert('Please choose an image file.');
        this.elInputFile.nativeElement.value = '';
      }
    }
  }

}
