$(document).ready(function () {
    
    //인스타그램 호버효과
    $('#instagram>ul').sliphover({
        target: '.insta_item',
        caption: 'data-caption'
    });

    //슬라이드
    $("#slider1").mySlider({ //탭박스 이름
        dur: 1000, //속도
        rolling_dur: 4000, //롤링 시간
        activeName: "on", //활성화시킬 클래스 이름
        panel: ".panel", //슬라이더 ul 이름
        navi: ".navi", //버튼 ul 이름
        prev: ".prev", //이전버튼 이름
        next: ".next", //다음버튼 이름
        start: ".start", //롤링시작버튼 이름
        stop: ".stop", //롤링정지버튼 이름
        autoStart: true //자동롤링 시작 유무 true:로딩시 롤링시작 ,  false : 버튼을 클릭해야 롤링시작
    });
    
    
    //드롭다운메뉴 배경
    $(".gnb>li").hover(
        function () {
            $(".gnbBg").addClass("hover");
        },
        function () {
            $(".gnbBg").removeClass("hover");
        }
    );
    
});
