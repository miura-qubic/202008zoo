<?php

header("Content-Type: text/html;charset=utf-8");
mb_language('ja');
mb_internal_encoding( "utf-8" );

//【２】HTMLエンティティ変換

$item_type_1 = htmlspecialchars($_POST['item_type_1'], ENT_QUOTES);
$item_type_2 = htmlspecialchars($_POST['item_type_2'], ENT_QUOTES);
$item_type_3 = htmlspecialchars($_POST['item_type_3'], ENT_QUOTES);
$user = htmlspecialchars($_POST['user'], ENT_QUOTES);
$user_kana = htmlspecialchars($_POST['user_kana'], ENT_QUOTES);
$job = htmlspecialchars($_POST['job'], ENT_QUOTES);
$comp_name = htmlspecialchars($_POST['comp_name'], ENT_QUOTES);
$dele = htmlspecialchars($_POST['dele'], ENT_QUOTES);
$zip = htmlspecialchars($_POST['zip11'], ENT_QUOTES);
$address = htmlspecialchars($_POST['addr11'], ENT_QUOTES);
$address_num = htmlspecialchars($_POST['address_num'], ENT_QUOTES);
$tel = htmlspecialchars($_POST['tel'], ENT_QUOTES);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES);
$fax = htmlspecialchars($_POST['fax'], ENT_QUOTES);
$email = htmlspecialchars($_POST['email'], ENT_QUOTES);
$date01 = htmlspecialchars($_POST['date01'], ENT_QUOTES);
$date02 = htmlspecialchars($_POST['date02'], ENT_QUOTES);
$time01 = htmlspecialchars($_POST['time01'], ENT_QUOTES);
$time02 = htmlspecialchars($_POST['time02'], ENT_QUOTES);
$num_people = htmlspecialchars($_POST['num_people'], ENT_QUOTES);
$msg = htmlspecialchars($_POST['msg'], ENT_QUOTES);
$planning = htmlspecialchars($_POST['planning'], ENT_QUOTES);
$agree01 = htmlspecialchars($_POST['agree01'], ENT_QUOTES);
$agree02 = htmlspecialchars($_POST['agree02'], ENT_QUOTES);

$user_kana = mb_convert_kana($user_kana,"sKV");      //「名前」半角カナ→全角カナ
// $message = mb_convert_kana($message2,"sKV");  




//管理者受信用メール送信処理
function funcManagerAddress($item_type_1,$item_type_2,$item_type_3,$user,$user_kana,$job,$comp_name,$dele,$zip,$address,$address_num,$tel,$phone,$fax,$email,$date01,$date02,$time01,$time02,$num_people,$msg,$planning,$agree01,$agree02){

    // $mailto = 'info@tree-co.net,tsukiyama@tree-co.net'; 
    $mailto = 'miura@qu-bic.jp'; 
    // $mailto = 'register@qu-bic.jp'; 
    $subject = "オンライン体験会予約申込メール"; 

    $content = "オンライン体験会LPより申込メールがありました。\n\n";
    $content .= "内容を確認後、返信してください。\n\n";
    $content .= "--------------------------------\n\n";


    $content .= "【体験会希望商品】：";
    
    if($item_type_1){
    $content .= $item_type_1." ";
    }
    if($item_type_2){
    $content .= $item_type_2." ";
    }
    if($item_type_3){
    $content .= $item_type_3." ";
    }
    $content .= "\n";

    $content .= "【お名前】：".$user."\n";
    $content .= "【フリガナ】：".$user_kana."\n";
    
    
    $content .= "【職種】：".$job."\n";
    $content .= "【会社名】：".$comp_name."\n";
    $content .= "【代表者氏名】：".$dele."\n";

    $content .= "【郵便番号】：".$zip."\n";
    $content .= "【都道府県市町村】：".$address."\n";
    $content .= "【番地・マンション名】：".$address_num."\n";


    $content .= "【電話番号】：".$tel."\n";
    $content .= "【携帯番号】：".$phone."\n";
    $content .= "【FAX番号】：".$fax."\n";
    $content .= "【メールアドレス】：".$email."\n";

    $content .= "【体験会第一希望日】：".$date01.' '.$time01."\n";
    $content .= "【体験会第二希望日】：".$date02.' '.$time02."\n";
    $content .= "【参加人数】：".$num_people."人\n";

    $content .= "【体験会に参加するきっかけは何ですか。】\n";
    $content .= $msg . "\n";
    $content .= "【購入予定】：".$planning."\n\n";

    // $content .= "名刺・サロン名刺等をご持参の上、お越しください。：".$agree01."\n\n";
    // $content .= "1エントリーにつき、施述を体験いただくのはお一人様とさせていただきます。：".$agree02."\n\n";
    $content .= "複数企業様でご参加いただく際は、各企業様ごとのエントリーをお願いいたします。：".$agree01."\n\n";
    $content .= "個人情報の取り扱いについて、プライバシーポリシーをご確認いただき、ご同意の上でご送信ください。：".$agree02."\n\n";


    
    $content .= "--------------------------------\n\n";

    $mailfrom="From:" .mb_encode_mimeheader($name) ."<".$email.">";
    if(mb_send_mail($mailto,$subject,$content,$mailfrom) == true){
        $managerFlag = "○";
    }else{
        $managerFlag = "×";
    }
    return $managerFlag;
}


//送信者用自動返信メール送信処理
function funcContactAddress($item_type_1,$item_type_2,$item_type_3,$user,$user_kana,$job,$comp_name,$dele,$zip,$address,$address_num,$tel,$phone,$fax,$email,$date01,$date02,$time01,$time02,$num_people,$msg,$planning,$agree01,$agree02){  
    $mailto = $email;

    $subject = "オンライン体験会へのお申し込みありがとうございます";
    $content = "この度は【TREE COMPANY オンライン体験会予約】にお申し込みいただき、ありがとうございます。\n\n";
    $content .= "以下の内容でお申し込みを受け付けました。\n\n";

        
    //本文

    $content .= "--------------------------------\n\n";

    $content .= "【体験会希望商品】：";
    
    if($item_type_1){
    $content .= $item_type_1." ";
    }
    if($item_type_2){
    $content .= $item_type_2." ";
    }
    if($item_type_3){
    $content .= $item_type_3." ";
    }
    $content .= "\n";

    $content .= "【お名前】：".$user."\n";
    $content .= "【フリガナ】：".$user_kana."\n";
    
    
    $content .= "【職種】：".$job."\n";
    $content .= "【会社名】：".$comp_name."\n";
    $content .= "【代表者氏名】：".$dele."\n";

    $content .= "【郵便番号】：".$zip."\n";
    $content .= "【都道府県市町村】：".$address."\n";
    $content .= "【番地・マンション名】：".$address_num."\n";


    $content .= "【電話番号】：".$tel."\n";
    $content .= "【携帯番号】：".$phone."\n";
    $content .= "【FAX番号】：".$fax."\n";
    $content .= "【メールアドレス】：".$email."\n";

    $content .= "【体験会第一希望日】：".$date01.' '.$time01."\n";
    $content .= "【体験会第二希望日】：".$date02.' '.$time02."\n";
    $content .= "【参加人数】：".$num_people."\n";

    $content .= "【体験会に参加するきっかけは何ですか。】\n";
    $content .= $msg . "\n";
    $content .= "【購入予定】：".$planning."\n\n";

    // $content .= "名刺・サロン名刺等をご持参の上、お越しください。：".$agree01."\n";
    // $content .= "1エントリーにつき、施述を体験いただくのはお一人様とさせていただきます。：".$agree02."\n";
    $content .= "複数企業様でご参加いただく際は、各企業様ごとのエントリーをお願いいたします。：".$agree01."\n";
    $content .= "個人情報の取り扱いについて、プライバシーポリシーをご確認いただき、ご同意の上でご送信ください。：".$agree02."\n\n";


    
    $content .= "--------------------------------\n\n\n";

    // $content .= "内容に誤りがあった場合には、お手数ですが下記よりご連絡お願い致します。\n";
    $content .= "内容確認のため、後日スタッフより確認のお電話させていただきます。\n";
    $content .= "※お申し込みされた開催日の3日前までにご連絡がつかない場合は、大変恐縮ですがキャンセルとさせていただきますのでご了承くださいませ。\n\n";
    $content .= "万が一お申し込み数が上限に達している場合には、ご了承ください。\n\n\n";
    $content .= "--------------------------------\n\n";
    $content .= "Tree Company株式会社\n";
    // $content .= "【東京本社】 〒165-0075 東京都新宿区高田馬場3-23-7 JESCO高田馬場6F \n";
    $content .= "【住所】 〒550-0015 大阪府大阪市西区南堀江2-13-30 SUNEASTBldg.901 \n";
    $content .= "【電話番号】 06-6684-9193 \n";
    $content .= "【MAIL】 info@tree-co.net\n";
    $content .= "【営業時間】平日 10:00～18:00\n\n";
    $content .= "--------------------------------\n";


    // $mailfrom="From:" .mb_encode_mimeheader("TREE COMPANY オンライン体験会予約") ."<'info@tree-co.net'>";
    $mailfrom="From:" .mb_encode_mimeheader("TREE COMPANY オンライン体験会予約") ."<'miura@qu-bic.jp'>";

    if(mb_send_mail($mailto,$subject,$content,$mailfrom) == true){
        $contactFlag = "○";
    }else{
        $contactFlag = "×";
    }
    return $contactFlag;
}


//送信者用自動返信メール送信
$contactAddress = funcContactAddress($item_type_1,$item_type_2,$item_type_3,$user,$user_kana,$job,$comp_name,$dele,$zip,$address,$address_num,$tel,$phone,$fax,$email,$date01,$date02,$time01,$time02,$num_people,$msg,$planning,$agree01,$agree02);
//管理者受信用メール送信
$managerAddress = funcManagerAddress($item_type_1,$item_type_2,$item_type_3,$user,$user_kana,$job,$comp_name,$dele,$zip,$address,$address_num,$tel,$phone,$fax,$email,$date01,$date02,$time01,$time02,$num_people,$msg,$planning,$agree01,$agree02);

if($contactAddress === "○" && $managerAddress === "○" ){
        header("Location: ./thanks.html");
}

