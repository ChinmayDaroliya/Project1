const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay:-1,
        stagger:0.1
    })
    .from("#footerheading",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    });
}
firstPageAnim();
var timeout ; 
// skew value of mouse
function circleMouseSkew (){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprevious = 0;
    var yprevious = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);    
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprevious);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprevious);

        xprevious = dets.clientX;
        yprevious = dets.clientY;

       circleMouseFollwer(xscale,yscale);
       timeout = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
       },100);
    });
}
circleMouseSkew();

function circleMouseFollwer(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
circleMouseFollwer();
 
//select elem then use mousemove , then find x and y position of mouse then put image on it 

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseleave", function (dets) {
       gsap.to(elem.querySelector("Img"), {
        opacity: 0,
        ease: Power3,
        duration0:.5,
       });
    });
    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
       gsap.to(elem.querySelector("Img"), {
        opacity: 1,
        ease: Power3,
        top:  diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diffrot*0.5)
       });
    });
});
