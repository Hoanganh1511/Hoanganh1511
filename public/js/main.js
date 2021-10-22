

$(function(){
   
    if($('textarea#ta').length){
        CKEDITOR.replace('ta');
       
    }

    $('a.confirmDeletion').on('click',()=>{
        if(!confirm('Bạn chắc chắn muốn xóa người này chứ ?'))
        return false;
    })

});
console.log('ta');

const navbarBrand = document.querySelector('.brand');
const videoBackground = document.querySelector('.background-video');

const closeMessage = document.querySelector('.close-message');
closeMessage.addEventListener('click',()=>{
    closeMessage.parentElement.classList.add('x-message');
});

const onTop = document.querySelector('.on-top');
const header = document.querySelector('.navbar');// lấy item cần set khi thực hiện function
window.addEventListener('scroll', function() //đặt sự kiện khi tìm được thao tác scroll
{
    header.classList.toggle("sticky",window.scrollY>0);// add/remove sticky, depending on test conditional 
    onTop.classList.toggle("hide",window.scrollY>0);
})
// click - to on top page
const onTopIcon = document.querySelector('.switch i');
onTopIcon.addEventListener('click',()=>{
    window.scrollTo(0, 0);
   
})
/// ON-OFF Music
const songBackground = document.querySelector('.background-song');
const onSound = document.querySelector('.on-sound');
const offSound = document.querySelector('.off-sound');

onSound.addEventListener('click',()=>{
    songBackground.pause();
    onSound.style.display = 'none';
    offSound.style.display = 'block';
})
offSound.addEventListener('click',()=>{
    songBackground.play();
    onSound.style.display = 'block';
    offSound.style.display = 'none';
   
})




const zoomBtn = document.querySelectorAll('.portfolio');
const imageView = document.querySelector('.image-view');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const imageBox = document.querySelector('.image-box');
//allImage = zoomBtn
let currentImageIdx = 0;
console.log(prevBtn.parentElement.classList.add('image-box'));
imageView.addEventListener('click',
function(){
    this.style.display="none";
    imageBox.style.display="none";
})


zoomBtn.forEach(function(btn, index){
    btn.addEventListener('click',function(){
        imageView.style.display="block";
        imageBox.style.display="block";
        currentImageIdx = index + 1;
       
        currentImageDisplay(currentImageIdx);
        
    })
})

function currentImageDisplay(position){
  
    imageBox.style.background = `url('images/${position}.jpg') center/cover no-repeat`;
    
 
}

prevBtn.addEventListener('click',function(){
    currentImageIdx--;
    if(currentImageIdx === 0){
        currentImageIdx = zoomBtn.length;
        
    }
    
    currentImageDisplay(currentImageIdx);
    console.log(currentImageIdx);
})
nextBtn.addEventListener('click',function(){
    currentImageIdx++;
    if(currentImageIdx === 7){
        currentImageIdx = 1;
    }
    currentImageDisplay(currentImageIdx);
    console.log(currentImageIdx);
})


//anim
const anim2 = document.querySelectorAll('.anim2');

observer = new IntersectionObserver((entries)=>{

   entries.forEach((entry)=>{
    if(entry.intersectionRatio > 0){
        entry.target.style.animation = `anim2 1.2s forwards ease-out`;
    }
    else{
        entry.target.style.animation = 'none';
    }
   })
})


   anim2.forEach((el)=>{
       observer.observe(el);
   })
/// anim 2
   const intersectionScroll = document.querySelectorAll('.intersection');

   observer = new IntersectionObserver((entries)=>{
   
      entries.forEach((entry)=>{
       if(entry.intersectionRatio > 0){
           entry.target.style.animation = `anim1 1s forwards ease-out`;
       }
       else{
           entry.target.style.animation = 'none';
       }
      })
   })
   
   
      intersectionScroll.forEach((el)=>{
          observer.observe(el);
      })
   

// observer.observe(intersectionScroll);


