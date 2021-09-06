
AOS.init();

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

function clickBtn() {
    setTimeout(() => {
        document.getElementById("send").classList.remove("click");
    }, 150);

    document.getElementById("send").classList.add("click");
    alert("Your Registration Is Done");
}

function reg(){
    // console.log("rewef");
    document.querySelector("form").style.visibility = "visible" ; 
    document.querySelector(".full").style.opacity = 0;
    document.querySelector(".formBody").style.opacity=1;
    document.querySelector(".formBody").style.top=0;
}

function close() {
    document.querySelector("form").style.visibility = "hidden" ; 
    document.querySelector(".full").style.opacity = 1;
}









