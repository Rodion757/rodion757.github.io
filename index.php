<?php
    $msg_box = ""; // â ýòîé ïåðåìåííîé áóäåì õðàíèòü ñîîáùåíèÿ ôîðìû
     
    if(isset($_POST['btn_submit'])){
        $errors = array(); // êîíòåéíåð äëÿ îøèáîê
        // ïðîâåðÿåì êîððåêòíîñòü ïîëåé
        if($_POST['user_name'] == "")    $errors[] = "Ïîëå 'Âàøå èìÿ' íå çàïîëíåíî!";
        if($_POST['user_email'] == "")   $errors[] = "Ïîëå 'E-mail' íå çàïîëíåíî!";
        if($_POST['tel'] == "") $errors[] = "Ïîëå 'Êîììåíòàðèé' íå çàïîëíåíî!";
        if($_POST['text_comment'] == "") $errors[] = "Ïîëå 'Êîììåíòàðèé' íå çàïîëíåíî!";
 
        // åñëè ôîðìà áåç îøèáîê
        if(empty($errors)){     
            // ñîáèðàåì äàííûå èç ôîðìû
            $message  = "ÔÈÎ: " . $_POST['user_name'] . "<br/>";
            $message .= "E-mail: " . $_POST['user_email'] . "<br/>";
            $message .= "Òåëåôîí: " . $_POST['tel'] . "<br/>";
            $message .= "Êîììåíòàðèé: " . $_POST['text_comment'];      
            send_mail($message); // îòïðàâèì ïèñüìî
            header('location: /');
            // âûâåäåì ñîîáùåíèå îá óñïåõå
            $msg_box = "<span style='color: green;'>Ñîîáùåíèå óñïåøíî îòïðàâëåíî!</span>";
        }else{
            // åñëè áûëè îøèáêè, òî âûâîäèì èõ
            $msg_box = "";
            foreach($errors as $one_error){
                $msg_box .= "<span style='color: red;'>$one_error</span><br/>";
            }
        }
    }
     
    // ôóíêöèÿ îòïðàâêè ïèñüìà
    function send_mail($message){
        // ïî÷òà, íà êîòîðóþ ïðèäåò ïèñüìî
        $mail_to = "d.negannov@gmail.com"; 
        // òåìà ïèñüìà
        $subject = "Çàïðîñ íà òåõíè÷åñêóþ ïîääåðæêó";
         
        // çàãîëîâîê ïèñüìà
        $headers= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n"; // êîäèðîâêà ïèñüìà
        $headers .= "From: Technical Support Company <no-reply@test.com>\r\n"; // îò êîãî ïèñüìî
         
        // îòïðàâëÿåì ïèñüìî 
        mail($mail_to, $subject, $message, $headers);
    }
?>





<!DOCTYPE html>
<html lang="ru">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>GoldMaster</title>
<link href="style.css" rel="stylesheet" type="text/css" />
</head>
            <link rel="stylesheet" type="text/css" href="themes/theme1.css" />
            <link rel="stylesheet" type="text/css" href="wicart.css" />
            <script src="http://code.jquery.com/jquery-1.11.0.min.js" type="text/javascript" ></script>
            <!-- WI-JQ-HEADER -->
            <script src="wicart.js"  type="text/javascript" ></script>
            <!-- WI-HEADER -->
            <style>
            .v {border:1px solid #999; border-radius: 5px;padding: 10px;margin-bottom: 10px; width: 340px;}
            </style>
<body>
           
<div id="body_wrapper">
    <div id="wrapper">
        <div id="header">
        
            <div id="site_title">
                <a href="index.html" target="_parent">
                    <img src="images/GoldMaster.png" alt="logo" />
                    <span>Ювилирная мастерская</span>
                </a> 
            </div>
            
            <div id="shopping_cart_box">
                <h3>г. Верещагино</h3>
                <p><span></span></p>
            </div>
        
        </div>
        
        <div id="menu">
        
            <div id="search_box">
              <form action="#" method="get">
                    <input type="text" value="" name="username" size="10" id="input_field" title="usernmae" />
                    <input type="submit" name="login" value="Найти" alt="login" id="submit_btn" title="Login" />
              </form>
            </div>  
                  
            <ul>
                <li><a href="index.html" class="current">Главная</a></li>
                <li><a href="Цены работ.html" target="_parent">Цены работ</a></li>
                <li><a href="Контакты.html">Контакты</a></li>
                <li><a href="Где нас найти.html">Где нас найти?</a></li>
                <li><a href="О нас.html">О нас</a></li>
                <li><a href="Help.html">Помощь</a></li>
            </ul>       
        
        </div>
        <div id="content_wrapper">
            
            <div class="sidebar_wrapper float_l">
                <div class="sidebar_top"></div>
                <div class="sidebar">
                
                    <div class="sidebar_box">
            
                        <h2>Виды работ</h2>
                        <div class="sidebar_box_content">
                        
                            <ul class="categories_list">
                                <li><a href="Ремонт.html">Ремонт</a></li>
                                <li><a href="Оптовая продажа.html">Оптавая продажа</a></li>
                                <li><a href="Продажа золота.html">Продажа золота</a></li>
                                <li><a href="Продажа серебра.html">Продажа серебра</a></li>
                                <li><a href="Продажа драгоценных камней.html">Продажа драгоценных камней</a></li>
                                <li><a href="Скупка золота.html">Скупка золота</a></li>
                                <li><a href="Скупка серебра.html">Скупка серебра</a></li>
                                <li><a href="Скупка драгоценных камней.html">Скупка драгоценных камней</a></li>
                                <li><a href="Чистка.html">Чистка</a></li>
                                <li><a href="Изготовление.html">Изготовление</a></li>
</ul></div></div>
                    
                    <div class="sidebar_box">
                    
                    	<h2>Сотрудничество</h2>
                        




                        <div class="sidebar_box_content">
                        
                        	<div id="newsletter_box">
                            
                               <form action="kod.php" method="post">
Ваше имя <input type="text" name="first_name">
Email: <input type="text" name="email" required placeholder="Обязательное поле">
Сообщение:<br><textarea rows="2" name="message" cols="21"></textarea>
<input type="submit" name="submit" value="Отправить">
</form>
                        	</div>
                            







                            </ul>
                            
                         </div>
    
                    </div>
                
                    
                
                </div> <div class="sidebar_bottom"></div>
            </div>
            
            <div id="content">
  				<div id="banner">
                	<a href="index.html" target="_parent"><img src="images/banner.png" alt="banner" /></a>                
                </div>
            
              <div id="content_top"></div>
                <div id="content_middle">
                
                   <h3>Ювелирная мастерская</h3>
                   
               <p>
               
Данная организация в своем владении имеет множество ювелирных мастерских, а так же ломбардов и ювелирных магазинов.<br><br>

<img src="images\ЮВ.jpg" alt="Christmas Bell" width="510" height="365" border="0" style="float: left; margin-right: 0px;" /><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<h2>Кто такой ювелир?</h2><img src="images\Ювелир.jpg" alt="Christmas Bell" width="300" height="200" border="0" style="float: left; margin-right: 10px;" />
Ювелир - специалист по изготовлению и ремонту ювелирных украшений. Русское слово "ювелир" происходит от персидского "джавхар" через европейские языки и означает "драгоценность". Немецкое Juwelier можно перевести как "драгоценный камень". Однокоренное слово "jewel" существует и в английском языке.
Важным качеством ювелирного мастера являются прилежание и терпение, художественный вкус и владение ремеслом.
<br>Для изготовления украшений используются материалы, которые желает видеть либо сам мастер, либо заказчик украшения. Основные для работы материаллы являются драгоценные металлы.
</h2><img src="images\Драг металлы.jpg" alt="Christmas Bell" width="300" height="200" border="0" style="float: right; margin-left: 10px;" />
Для выполнения ювелирных работ мастер ювелирного дела должен иметь широкий спектр навыков и знаний, а так же специальные инструменты. В процессе производства применяются такие виды работ как: литьё, прокатка, распилка, гибка, пайка, опиловка, чеканка, филигрань, волочение, шлифовка, полировка, огранка и закрепка. Некоторые из них являются сами по себе профессиями.

               </p>


<br>

                    











                    
                  <div class="cleaner"></div>
                            
                </div>
                <div id="content_bottom"></div>
            
            </div> 
                
            <div class="sidebar_wrapper float_r">
                <div class="sidebar_top"></div>
                <div class="sidebar">
                	
                    <div class="sidebar_box">
                
                   	<h2>Акции</h2>
                    
                    	<div class="sidebar_box_content">
            
                         	<div class="news_box">
                                        <h4><a href="Продажа золота.html">Золото</a></h4>
                                        <p>Скидка на покупку 750 и 999 пробы золота 5%!!! При изготовлении из вашего золота под заказ по каталогу, сумма за грамм всего 490 рублей!!!</p>
                            </div>
                            <div class="news_box">
                                        <h4><a href="Продажа серебра.html">Серебро</a></h4>
                                        <p>Изготовим под ваш заказ по самой низкой цене в городе Верещагино, всего 170 рублей за грамм!!!</p>
                            </div>
                            <div class="news_box">
                                        <h4><a href="Продажа драгоценных камней.html">Драгоценные камни</a></h4>
                                        <p>Большой выбор драгоценных камней!!! Аппатит 5.66 карат, всего за 20099 рублей!!! Янтарь по 4000 рублей за грамм!!!</p>
                            </div>
                            
                            <div class="news_box">
                                        <h4><a href="Изготовление.html">Изготовление</a></h4>
                                        <p>При изготовлении золотого браслета весом от 9 грамм, скидка на браслеты и кольца из серебра 45%!!!</p>

                            </div>
                            <br><br><br>
                        </div>
                    </div> 
                    
                    <div class="sidebar_box">
                    
                    	
                    
                    </div> 

                </div> <div class="sidebar_bottom"></div> 
            </div> 
            
            
          <div class="cleaner"></div>

      </div> 
        
    </div>
	    
    <div class="cleaner"></div>
</div> 

<div id="footer_wrapper">

	<div id="footer">
    
        <ul class="footer_menu">
            <li><a href="index.html" class="current">Главная</a></li>
            <li><a href="https://mail.yandex.ru/?uid=327596658&login=rodion-lakushin#inbox" target="_blank">Реклама</a></li>
            <li><a href="Цены работ.html" target="_parent">Цены работ</a></li>
            <li><a href="Контакты.html">Контакты</a></li>
            <li><a href="Где нас найти.html">Где нас найти?</a></li>
            <li><a href="О нас.html">О нас</a></li>
            <li class="last_menu"><a href="Help.html">Помощь</a></li>
        </ul> 
    
        Работаем с 2006 года <a href="http://www.rusprofile.ru/ip/306594704800042">Директор: Лакушин Василий Иванович</a> | 
        <a href="" target="_parent">Для связи: +7 952 330 89 00</a>
        
    	<div class="cleaner"></div>
 




 <form action="<?=$_SERVER['PHP_SELF'];?>" method="post" name="frm_feedback" class="forma">
        <h2>Запрос в техподдержку</h2>
        <label>Ваше имя:</label><br/>
        <input type="text" class="qw" name="user_name" value="<?=(isset($_POST['user_name'])) ? $_POST['user_name'] : ""; // сохраняем то, что вводили?>" /><br/>
         
        <label>E-mail:</label><br/>
        <input type="text" class="qw" name="user_email" value="<?=(isset($_POST['user_email'])) ? $_POST['user_email'] : ""; // сохраняем то, что вводили?>" /><br/>

        <label>Телефон:</label><br/>
        <input type="text" class="qw" name="tel" value="<?=(isset($_POST['tel'])) ? $_POST['tel'] : ""; // сохраняем то, что вводили?>" /><br/>
         
        <label>Комментарий:</label><br/>
        <textarea name="text_comment" class="qww"><?=(isset($_POST['text_comment'])) ? $_POST['text_comment'] : ""; // сохраняем то, что вводили?></textarea>
         
        <br/>
        <div class="btn1">
        <input class="kn" type="submit" value="Отправить" name="btn_submit" />
        </div>
    </form>
    </div><!-- content -->








</div> 
</div> 















