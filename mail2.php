<?php

header("Content-Type: text/html;charset=utf-8");
mb_language('ja');
mb_internal_encoding( "utf-8" );

//【２】HTMLエンティティ変換

$contact_type = htmlspecialchars($_POST['contact_type'], ENT_QUOTES);
$user = htmlspecialchars($_POST['user'], ENT_QUOTES);
$user_kana = htmlspecialchars($_POST['user_kana'], ENT_QUOTES);
$comp_name = htmlspecialchars($_POST['comp_name'], ENT_QUOTES);
$tel = htmlspecialchars($_POST['tel'], ENT_QUOTES);
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES);
$email = htmlspecialchars($_POST['email'], ENT_QUOTES);
$msg = htmlspecialchars($_POST['msg'], ENT_QUOTES);

$user_kana = mb_convert_kana($user_kana,"sKV");      //「名前」半角カナ→全角カナ
// $message = mb_convert_kana($message2,"sKV");  




//管理者受信用メール送信処理
function funcManagerAddress($contact_type,$user,$user_kana,$comp_name,$tel,$phone,$email,$msg){

    $mailto = 'info@tree-co.net,tsukiyama@tree-co.net'; 
    // $mailto = 'miura@qu-bic.jp'; 
    // $mailto = 'register@qu-bic.jp'; 
    $subject = "お問い合わせメール"; 

    $content = "Nail Printer Zooよりお問い合わせメールがありました。\n\n";
    $content .= "内容を確認後、返信してください。\n\n";
    $content .= "--------------------------------\n\n";

    $content .= "【お問い合わせの種類】：".$contact_type."\n";

    $content .= "【お名前】：".$user."\n";
    $content .= "【フリガナ】：".$user_kana."\n";

    $content .= "【会社名】：".$comp_name."\n";

    $content .= "【電話番号】：".$tel."\n";
    $content .= "【携帯番号】：".$phone."\n";
    $content .= "【メールアドレス】：".$email."\n";

    $content .= "【お問い合わせ内容】\n";
    $content .= $msg . "\n\n";



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
function funcContactAddress($contact_type,$user,$user_kana,$comp_name,$tel,$phone,$email,$msg){
    $mailto = $email;

    $subject = "Nail Printer Zooにお問い合わせをいただき、ありがとうございます";
    $content = "この度は【TREE COMPANY Nail Printer Zoo】にお問い合わせいただき、ありがとうございます。\n\n";
    $content .= "以下の内容でお問い合わせを受け付けました。\n\n";

        
    //本文

    $content .= "--------------------------------\n\n";

    $content .= "【お問い合わせの種類】：".$contact_type."\n";

    $content .= "【お名前】：".$user."\n";
    $content .= "【フリガナ】：".$user_kana."\n";

    $content .= "【会社名】：".$comp_name."\n";

    $content .= "【電話番号】：".$tel."\n";
    $content .= "【携帯番号】：".$phone."\n";
    $content .= "【メールアドレス】：".$email."\n";

    $content .= "【お問い合わせ内容】\n";
    $content .= $msg . "\n\n";


    $content .= "--------------------------------\n\n\n";

    $content .= "担当者より、2営業日以内に返信いたします。\n";
    $content .= "また、お問い合わせの内容によっては、返信できない場合もございますのでご了承ください。\n\n\n";
    $content .= "--------------------------------\n\n";
    $content .= "Tree Company株式会社\n";
    // $content .= "【東京本社】 〒165-0075 東京都新宿区高田馬場3-23-7 JESCO高田馬場6F \n";
    $content .= "【住所】 〒550-0015 大阪府大阪市西区南堀江2-13-30 SUNEASTBldg.901 \n";
    $content .= "【電話番号】 06-6684-9193 \n";
    $content .= "【MAIL】 info@tree-co.net\n";
    $content .= "【営業時間】平日 10:00～18:00\n\n";
    $content .= "--------------------------------\n";


    $mailfrom="From:" .mb_encode_mimeheader("TREE COMPANY Nail Printer Zoo") ."<'info@tree-co.net'>";
    // $mailfrom="From:" .mb_encode_mimeheader("TREE COMPANY Nail Printer Zoo") ."<'miura@qu-bic.jp'>";

    if(mb_send_mail($mailto,$subject,$content,$mailfrom) == true){
        $contactFlag = "○";
    }else{
        $contactFlag = "×";
    }
    return $contactFlag;
}


//送信者用自動返信メール送信
$contactAddress = funcContactAddress($contact_type,$user,$user_kana,$comp_name,$tel,$phone,$email,$msg);
//管理者受信用メール送信
$managerAddress = funcManagerAddress($contact_type,$user,$user_kana,$comp_name,$tel,$phone,$email,$msg);

if($contactAddress === "○" && $managerAddress === "○" ){
        header("Location: ./thanks2.html");
}

