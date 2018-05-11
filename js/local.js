(function($) {

	$.fn.at_currDay = function () {
		var today = new Date;
		var months=["января","февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября"];
		$(this).text(today.getDate()+" "+months[today.getMonth()]+" "+today.getFullYear());
	}

	$.fn.at_Time = function () {

		var TW=$(this);
		function startTime()
		{
			var tm=new Date();
			var h=tm.getHours();
			var m=tm.getMinutes();
			var s=tm.getSeconds();
			m=checkTime(m);
			s=checkTime(s);
			TW.text(h+":"+m+":"+s);

		}

		function checkTime(i){
			if (i<10){
				i="0" + i;
			}
			return i;
		}	

		setInterval(startTime,500);

	}
	
$.fn.at_yandexMap = function (xl,yd,zoom, ttl) {
        $(this).each(function() {

          var eventedMap =$(this);
          eventedMap.empty();
          ymaps.ready(init);
              
              var myMap;

              function init(){     
                  myMap = new ymaps.Map(eventedMap.attr("id"), {
                      center: [xl, yd],
                      zoom: zoom
                  });
                  //myMap.setType('yandex#hybrid');
                  myPlacemark = new ymaps.Placemark([xl, yd], {
                     /* hintContent: ttl,
                      balloonContent: ttl,*/
                      iconContent: ttl
                  },{
                    iconLayout: 'default#image',
                    iconImageHref: '/wp-content/themes/golden/assets/images/map.png',
                    iconImageSize: [22, 33],
                    iconImageOffset: [-22, -33]
                  });

                  myMap.geoObjects.add(myPlacemark);
              }

             
          return $(this);
        });
     }
	
	$.fn.at_form = function (action, formkey) {
        
        $(this).each(function() {
          var form =   $(this).find("form").first();
          var inputs = $(this).find("input[type='text']");
          var submit = $(this).find("[type='submit']");

          
         $(form).on( "submit", function () {return false;} )


         $(submit).on('click', function (event) {
          event.preventDefault();

          var noerr=true;
            for (var i = inputs.length - 1; i >= 0; i--) {
              if (!$(inputs[i]).val()) {
                $(inputs[i]).parent().addClass("error");
                noerr=false;
                //$(inputs[i]).parent().find("label").text("Поле не заполнено!");
              }else if($(inputs[i]).attr("name")=="phone") {
               var phoneReg=/((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/;
                  if(!phoneReg.test($(inputs[i]).val())){
                    $(inputs[i]).parent().addClass("error");
                    noerr=false;
                    //$(inputs[i]).parent().find("label").text("Поле заполнено не верно!");
                  }else{
                    $(inputs[i]).parent().removeClass("error");
                  }

              }else{
                $(inputs[i]).parent().removeClass("error");
              }
            };
            if (noerr){
              if (!action) action=$(form).attr("action");
              if (!formkey) formkey=$(form).attr("name");
              var data=$(form).serialize()+"&page="+location.href+"&formkey="+formkey;

              $.ajax({
                method: "POST",
                url: action,
                data: data
              })
                .done(function( msg ) {
                 var result =JSON.parse(msg);
                 if(result.success){
                    var formHeight=$(form).height();
                    var respond=$("<div class=\"order__success\">Сообщение отправлено!</div>");
                    respond.css("height", formHeight);
                    $(form).replaceWith(respond);
                 }
              });
            }
         });

        });

        return $(this);
    }


     $.fn.at_slider = function (speed, suffix) {
	    if (!suffix) suffix="";
	    $(this).each(function() {  
	         var sldwrp =$(this);      
	         var slider =    $(this).find("ul.slider"+suffix+"__list");
	         var item =      $(this).find("li.slider"+suffix+"__item");

	         var mgr=parseFloat( item.css('margin-right') );
	         var total = item.length;
	         var width = item.width()+mgr;
	         var index = 0;
	         var indexPrev=0;
	         var itemPrev, itemNext=item.first();
	         //slider.width(total * width);
	         function carouselSlide(index) {        	
	         	var ttl=0;
	         	for (var i = 0; i < index; i++) {
	         		console.log(item.eq(i).width());
	         		ttl=ttl-item.eq(i).width()-mgr;
	         	};

	             slider.stop().animate({
	                     left: ttl+"px"
	               }, speed);
	          }

	          $(this).parent().find(".partners__caption").on('click', function () {
	              index += 1;
	              carouselSlide(index = (index > total - 1) ? 0 : index);
	          });

	        });    
	    }


	    	
	    $.fn.at_metallCalc = function () {
	    	var probaSelect =$(this).find(".calculator__proba");
	    	var weightInput =$(this).find(".calculator__weight");
	    	var paymentSelect =$(this).find(".calculator__payment");
	    	var metallID = $(".metalls__table").attr("data-metall-id");
	    	var metTable=$(".metalls__table tbody tr");
	    	var metData=[];
	    	metTable.each(function(index, el) {
	    		metData[index]=[];
	    		$(el).find("td").each(function(findex, fel) {
	    			metData[index][findex]=$(fel).text();	
	    		});
	    	});
	    	console.log(metData);
	    	probaSelect.empty();
	    	for (var i =0;  i<metData.length; i++) {
	    		probaSelect.append('<option value="'+i+'">'+metData[i][0]+'</option>');
	    	};


	    	//----------------------
	    	weightInput.change(function(event) {
	    		var newWeight=parseInt(weightInput.val());
	    		console.log(newWeight?newWeight:0);
	    		weightInput.val(newWeight?newWeight:0);
	    	});


	    $(".calculator__submit").click(function(event) {
	    	var ves=parseInt(weightInput.val());
	    	var itogo=0;
	    	var paymentType=paymentSelect.val();
	    	var probeType=probaSelect.val();
	    	if(!(ves>0)){return false;}
	    	if(!metallID) metallID=4;
	    	switch(parseInt(metallID)) {
	            case 1: // золото
	                if(ves<500) {
	                	
	                    itogo=ves*metData[probeType][1];
	                    if (paymentType==3) {
	                        //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                        //$('#message').text('(выплата наличными)');
	                    }
	                    if (paymentType==2) {
	                        //оплата на карту
	                        itogo=ves*metData[probeType][3];
	                        itogo=itogo*0.985; // -1.5 процента
	                        itogo=itogo.toFixed(2);
	                        //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                        //$('#message').text('(выплата на карту)');
	                    }
	                    if (paymentType==1) {
	                        itogo=ves*metData[probeType][4];
	                        itogo=itogo*0.985; // -1.5 процента
	                        itogo=itogo.toFixed(2);
	                        //оплата оплата на рс
	                       // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на расчетный счет юридического лица)');
	                    }


	                } else {

	                    if (paymentType==2) {
	                        //оплата на карту
	                        itogo=ves*metData[probeType][3];
	                       // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на карту)');
	                    }

	                    if (paymentType==3) {
	                        //оплата наличными
	                        itogo=ves*metData[probeType][2];
	                       // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата наличными)');
	                    }
	                    if (paymentType==1) {
	                        //оплата оплата на рс
	                        itogo=ves*metData[probeType][4];
	                       // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на расчетный счет юридического лица)');
	                    }


	                }

	                break;

	            case 2: // серебро
	                if(ves<1000) {
	                    itogo=ves*metData[probeType][1];
	                    //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                    if ($('#oplata').val()<1) {
	                       // $('#message').text('(выплата наличными)');
	                    } else {
	                       // $('#message').text('(выплата наличными, так как вес меньше 1 кг.)');
	                    }

	                } else {

	                    if (paymentType==2) {
	                        //оплата на карту
	                        itogo = ves * metData[probeType][3];
	                        //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на карту)');

	                    }
	                    if (paymentType==3) {
	                        //оплата наличными
	                        itogo=ves*metData[probeType][2];
	                        //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата наличными)');
	                    }
	                    if (paymentType==1) {
	                        //оплата оплата на рс
	                        itogo = ves *metData[probeType][3];
	                       // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на расчетный счет юридического лица)');
	                    }

	                }


	                break;
	            case 4: // Палладий
	                if(ves<1000) {
	                    itogo=ves*metData[probeType][1];
	                    //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                    if ($('#oplata').val()<1) {
	                       // $('#message').text('(выплата наличными)');
	                    } else {
	                       // $('#message').text('(выплата наличными, так как вес меньше 1 кг.)');
	                    }

	                } else {

	                    if (paymentType==2) {
	                        //оплата на карту
	                        itogo = ves * metData[probeType][3];
	                        //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на карту)');

	                    }
	                    if (paymentType==3) {
	                        //оплата наличными
	                        itogo=ves*metData[probeType][2];
	                        //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата наличными)');
	                    }
	                    if (paymentType==1) {
	                        //оплата оплата на рс
	                        itogo = ves *metData[probeType][3];
	                       // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                       // $('#message').text('(выплата на расчетный счет юридического лица)');
	                    }

	                }


	                break;
	            case 3: // платина

	             	if(ves<1000) {
	                    itogo=ves*metData[probeType][1];
	                    //$('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	                    if ($('#oplata').val()<1) {
	                       // $('#message').text('(выплата наличными)');
	                    } else {
	                       // $('#message').text('(выплата наличными, так как вес меньше 1 кг.)');
	                    }

	                } else{
						itogo=ves*metData[probeType][2];
	                }
	                
	               // $('.itogo span').text(itogo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));

	                if (paymentType==2) {
	                   // $('#message').text('(выплата на карту)');
	                }

	                if (paymentType==3) {
	                    //оплата наличными
	                   // $('#message').text('(выплата наличными)');
	                }
	                if (paymentType==1) {
	                    //оплата оплата на рс
	                   // $('#message').text('(выплата на расчетный счет юридического лица)');
	                }


	                break;
        	};
        	/* Act on the event */
        		
        		itogo+="";
        		console.log(itogo);
        		$('.calculator__total strong').text(itogo.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

	    });

	    }

})(jQuery)



$(document).ready(function() {
	$('.courses__date').at_currDay();
	$('.courses__time').at_Time();
	$('.partner__slider').at_slider(700, "-partners");
	$('.map__gmap').at_yandexMap(55.804399, 37.524804, 16, "Golden world");

	$('.calculator').at_metallCalc();
	$('input[name="phone"]').mask("+7 (999) 999 99 99",{placeholder:" "});
	$('.feadback').at_form("/sender.php", "order");
	$('.topmenu__ham').click(function(event) {
		if($(this).parent().hasClass('opened')){
			$(this).parent().removeClass('opened');
		} else{
			$(this).parent().addClass('opened');
		}
	});

});