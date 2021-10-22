

const navbarBrand = document.querySelector('.brand');
const videoBackground = document.querySelector('.background-video');

const navigationCat = document.querySelector('.navigation-category');
const navigation = document.querySelector('.navigation');
console.log(navigation,navigationCat);
navigationCat.addEventListener('click',function(){
    
    navigation.classList.toggle('navigation-toggle');
});



const onTop = document.querySelector('.on-top');
const searchBar = document.querySelector('.search-bar');
const header = document.querySelector('.navbar');// lấy item cần set khi thực hiện function
window.addEventListener('scroll', function() //đặt sự kiện khi tìm được thao tác scroll
{
    header.classList.toggle("sticky",window.scrollY>0);// add/remove sticky, depending on test conditional 
    searchBar.classList.toggle("sticky",window.scrollY>0);
    onTop.classList.toggle("hide",window.scrollY>0);
    
})
// click - to on top page
const onTopIcon = document.querySelector('.switch i');
onTopIcon.addEventListener('click',()=>{
    window.scrollTo(0, 0);
   
})




// const zoomBtn = document.querySelectorAll('.portfolio');
// const imageView = document.querySelector('.image-view');
// const nextBtn = document.querySelector('#next-btn');
// const prevBtn = document.querySelector('#prev-btn');
// const imageBox = document.querySelector('.image-box');
// //allImage = zoomBtn
// let currentImageIdx = 0;
// console.log(prevBtn.parentElement.classList.add('image-box'));
// imageView.addEventListener('click',
// function(){
//     this.style.display="none";
//     imageBox.style.display="none";
// })


// zoomBtn.forEach(function(btn, index){
//     btn.addEventListener('click',function(){
//         imageView.style.display="block";
//         imageBox.style.display="block";
//         currentImageIdx = index + 1;
       
//         currentImageDisplay(currentImageIdx);
        
//     })
// })

// function currentImageDisplay(position){
  
//     imageBox.style.background = `url('images/${position}.jpg') center/cover no-repeat`;
    
 
// }

// prevBtn.addEventListener('click',function(){
//     currentImageIdx--;
//     if(currentImageIdx === 0){
//         currentImageIdx = zoomBtn.length;
        
//     }
    
//     currentImageDisplay(currentImageIdx);
//     console.log(currentImageIdx);
// })
// nextBtn.addEventListener('click',function(){
//     currentImageIdx++;
//     if(currentImageIdx === 7){
//         currentImageIdx = 1;
//     }
//     currentImageDisplay(currentImageIdx);
//     console.log(currentImageIdx);
// })


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
      });
   
    
      const closeMessage = document.querySelector('.close-message');
      function btncloseMessage(){
          closeMessage.parentElement.classList.add('x-message');
      }
      
      /// ON-OFF Music
const songBackground = document.querySelector('.background-song');
const onSound = document.querySelector('.on-sound');
const offSound = document.querySelector('.off-sound');

function onMusic(){
    songBackground.pause();
    onSound.style.display = 'none';
    offSound.style.display = 'block';
}
function offMusic(){
    songBackground.play();
    onSound.style.display = 'block';
    offSound.style.display = 'none';
}



const onsearchbar = document.querySelector('.search-bar');
const iconsearchbar = document.querySelector('.icon-open-search');

function toggle_search(){
    onsearchbar.classList.toggle("activeSearchbar");
}
// function openSearch(){
//     onsearchbar.style.left = '0';
//   iconsearchbar.style.transform = 'rotate(180deg)';
//   if (onsearchbar.style.left === "-300px") {
//     onsearchbar.style.left === "0";
//   }     
//     else{
//         onsearchbar.style.left === "-300px";
//     }
    // if (iconsearchbar.style.transform === "rotate(180deg)") {
    //     iconsearchbar.style.transform === "rotate(0)";
    //   }else{
    //     iconsearchbar.style.transform === "rotate(180deg)";
    //   }


    // onSound.addEventListener('click',()=>{
   
// })
// offSound.addEventListener('click',()=>{
   
   
// })

// observer.observe(intersectionScroll);


function test3() {
    const pu = document.querySelector('.profile_user');
    const ou = document.querySelector('.order_user');
    pu.style.display = "none";
    ou.style.display = "block";
}

function test4() {
    const pu = document.querySelector('.profile_user');
    const ou = document.querySelector('.order_user');
    pu.style.display = "block";
    ou.style.display = "none";
}