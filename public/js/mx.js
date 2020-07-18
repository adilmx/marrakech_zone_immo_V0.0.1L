/* pagination */
$(document).ready(function(){
    $("a[data-id='page-a']").click(function(){
        var links = $("li[data-id='page-li']").toArray();
        var l_lnk = links.length ;

        var wds = $("[class*=GridLex-grid]>[class*=_mx-widget]").toArray();
        var l_wd = wds.length ;

        var id =  event.target.getAttribute("id-pg");

        $("li[data-id='page-li'][id-pg='"+id+"']").addClass("active");
        $("[class*=GridLex-grid]>[class*=_mx-widget][data-widget='"+id+"']").removeClass("display-wd");

      wds.forEach(element => {
        if( element.getAttribute("data-widget") != id ){
            element.classList.add("display-wd");
        }

      });

      links.forEach(element => {
        if( element.getAttribute("id-pg") != id ){
            element.classList.remove("active");
        }

      });

    });


    $("a[aria-label='next-pg']").click(function(){
        var links = $("li[data-id='page-li']").toArray();
        var l_lnk = links.length ;

        var wds = $("[class*=GridLex-grid]>[class*=_mx-widget]").toArray();
        var l_wd = wds.length ;

        var id_active = $("li[data-id='page-li'][class*=active]").attr("id-pg");
        var act = parseInt(id_active) + 1 ;

        if(parseInt(id_active) == l_lnk){
            $("li[data-id='page-li'][class*=active]").removeClass("active");
            $("li[data-id='page-li'][id-pg='"+1+"']").addClass("active");
            $("[class*=GridLex-grid]>[class*=_mx-widget][data-widget='"+1+"']").removeClass("display-wd");

            wds.forEach(element => {
                if( element.getAttribute("data-widget") != 1 ){
                    element.classList.add("display-wd");
                }

              });
        }else{
            $("li[data-id='page-li'][class*=active]").removeClass("active");
            $("li[data-id='page-li'][id-pg='"+act+"']").addClass("active");
            $("[class*=GridLex-grid]>[class*=_mx-widget][data-widget='"+act+"']").removeClass("display-wd");

            wds.forEach(element => {
                if( element.getAttribute("data-widget") != act ){
                    element.classList.add("display-wd");
                }

              });
        }
    });

    $("a[aria-label='prev-pg']").click(function(){
        var links = $("li[data-id='page-li']").toArray();
        var l_lnk = links.length ;

        var wds = $("[class*=GridLex-grid]>[class*=_mx-widget]").toArray();
        var l_wd = wds.length ;

        var id_active = $("li[data-id='page-li'][class*=active]").attr("id-pg");
        var act = parseInt(id_active) - 1 ;

        if(parseInt(id_active) == 1){
            $("li[data-id='page-li'][class*=active]").removeClass("active");
            $("li[data-id='page-li'][id-pg='"+l_lnk+"']").addClass("active");
            $("[class*=GridLex-grid]>[class*=_mx-widget][data-widget='"+l_lnk+"']").removeClass("display-wd");

            wds.forEach(element => {
                if( element.getAttribute("data-widget") != l_lnk ){
                    element.classList.add("display-wd");
                }

              });
        }else{
            $("li[data-id='page-li'][class*=active]").removeClass("active");
            $("li[data-id='page-li'][id-pg='"+act+"']").addClass("active");
            $("[class*=GridLex-grid]>[class*=_mx-widget][data-widget='"+act+"']").removeClass("display-wd");

            wds.forEach(element => {
                if( element.getAttribute("data-widget") != act ){
                    element.classList.add("display-wd");
                }

              });
        }
    });

    });


/* search button */

$(document).ready(function(){
   $(".hero-mx-srch .form-group .btn").click(function(){
       $(".hero-mx-srch form .btn-all-mx").removeClass("display-wd");
       var srh_txt = $(".hero-mx-srch .form-group input").val();
       var wds = ".mx-trip-guide-content h3";

       $(wds).each(function(){
        var txt = $(this).text();
        if(txt.includes(srh_txt)){
            $(this).parent().closest(".GridLex-col-3_mdd-4_sm-6_xs-6_xss-12_mx-widget").removeClass("display-wd");
        }else{
            $(this).parent().closest(".GridLex-col-3_mdd-4_sm-6_xs-6_xss-12_mx-widget").addClass("display-wd");
        }

       });

   });
   $(".hero-mx-srch form .btn-all-mx").click(function(){
    $(this).addClass("display-wd");

       var wds = ".GridLex-col-3_mdd-4_sm-6_xs-6_xss-12_mx-widget";

       $(wds).each(function(){
        if( $(this).attr("data-widget") != 1 ){
            $(this).addClass("display-wd");
        }else{
            $(this).removeClass("display-wd");
        }
       });

    });

});
