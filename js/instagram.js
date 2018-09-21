$(document).ready(function(){
  	

    var dataURL = 'https://api.instagram.com/v1/users/self/media/recent';
    var photoData;
  
    var $wrap = $('#instagram>ul'); 
    var count_num = 30; 
    var token = "2311280572.1677ed0.e6fb91b5ca574246974c3b807fff2772";
    var text_count =15; //인스타본문 글자 짜를 갯수
   
    
    var getData = function(url) {
      $.ajax({
        url: url,
        dataType: 'jsonp',
        data: {
          access_token: token, 
          count:count_num
        }
      })
      .success(function(data) {
        photoData = data;	
        console.log(photoData);      
        var post = photoData.data;       
  
        $(post).each(function(i){  
      
          var imgUrl = this.images.standard_resolution.url;
          var imgLink = this.link;
          var tags = this.tags[0];
          var caption;
  
          if(this.caption){
            caption = this.caption.text;   
            var len = caption.length;
                  
            if(len>text_count){
              caption = caption.substr(0,text_count)+"...";  
            }
            
          }
          
        
          $wrap.append(
            $('<li class="insta_item '+tags+'" style="background-image:url('+imgUrl+');">').attr({
              "data-caption":'<a href="'+imgLink+'" style="text-decoration:none; font-weight:bold; color:#fff; display:inline-block; width:100px; height:30px; border:1px solid #aaa; text-align:center; line-height:30px; font-size:12px;">VIEW</a>'
            })           
          );
          
  
        });

        $(".insta_item").css({
          "background-position":"center",
          "background-size" : "cover",
          "background-repeat" : "no-repeat",
          "background-color" : "#000"
        });
  
        
      })
      .error(function() {
            alert("데이터불러오기에 실패했습니다");
      })
    }
  
    getData(dataURL);   
  
      
  });
  