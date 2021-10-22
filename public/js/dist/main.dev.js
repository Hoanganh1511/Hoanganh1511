"use strict";

$(function () {
  if ($('textarea#ta').length) {
    CKEDITOR.replace('ta');
  }

  $('a.confirmDeletion').on('click', function () {
    if (!confirm('Bạn chắc chắn muốn xóa người này chứ ?')) return false;
  });
});
console.log('ta');
var navbarBrand = document.querySelector('.brand');
var videoBackground = document.querySelector('.background-video');
var closeMessage = document.querySelector('.close-message');
closeMessage.addEventListener('click', function () {
  closeMessage.parentElement.classList.add('x-message');
});
var onTop = document.querySelector('.on-top');
var header = document.querySelector('.navbar'); // lấy item cần set khi thực hiện function

window.addEventListener('scroll', function () //đặt sự kiện khi tìm được thao tác scroll
{
  header.classList.toggle("sticky", window.scrollY > 0); // add/remove sticky, depending on test conditional 

  onTop.classList.toggle("hide", window.scrollY > 0);
}); // click - to on top page

var onTopIcon = document.querySelector('.switch i');
onTopIcon.addEventListener('click', function () {
  window.scrollTo(0, 0);
}); /// ON-OFF Music

var songBackground = document.querySelector('.background-song');
var onSound = document.querySelector('.on-sound');
var offSound = document.querySelector('.off-sound');
onSound.addEventListener('click', function () {
  songBackground.pause();
  onSound.style.display = 'none';
  offSound.style.display = 'block';
});
offSound.addEventListener('click', function () {
  songBackground.play();
  onSound.style.display = 'block';
  offSound.style.display = 'none';
});
var zoomBtn = document.querySelectorAll('.portfolio');
var imageView = document.querySelector('.image-view');
var nextBtn = document.querySelector('#next-btn');
var prevBtn = document.querySelector('#prev-btn');
var imageBox = document.querySelector('.image-box'); //allImage = zoomBtn

var currentImageIdx = 0;
console.log(prevBtn.parentElement.classList.add('image-box'));
imageView.addEventListener('click', function () {
  this.style.display = "none";
  imageBox.style.display = "none";
});
zoomBtn.forEach(function (btn, index) {
  btn.addEventListener('click', function () {
    imageView.style.display = "block";
    imageBox.style.display = "block";
    currentImageIdx = index + 1;
    currentImageDisplay(currentImageIdx);
  });
});

function currentImageDisplay(position) {
  imageBox.style.background = "url('images/".concat(position, ".jpg') center/cover no-repeat");
}

prevBtn.addEventListener('click', function () {
  currentImageIdx--;

  if (currentImageIdx === 0) {
    currentImageIdx = zoomBtn.length;
  }

  currentImageDisplay(currentImageIdx);
  console.log(currentImageIdx);
});
nextBtn.addEventListener('click', function () {
  currentImageIdx++;

  if (currentImageIdx === 7) {
    currentImageIdx = 1;
  }

  currentImageDisplay(currentImageIdx);
  console.log(currentImageIdx);
}); //anim

var anim2 = document.querySelectorAll('.anim2');
observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = "anim2 1.2s forwards ease-out";
    } else {
      entry.target.style.animation = 'none';
    }
  });
});
anim2.forEach(function (el) {
  observer.observe(el);
}); /// anim 2

var intersectionScroll = document.querySelectorAll('.intersection');
observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = "anim1 1s forwards ease-out";
    } else {
      entry.target.style.animation = 'none';
    }
  });
});
intersectionScroll.forEach(function (el) {
  observer.observe(el);
}); // observer.observe(intersectionScroll);