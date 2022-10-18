<?php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  //от кого письмо
  $mail->setForm('ejonish0@mail.ru', 'Привет из моей формы');
  //Кому письмо отправить
  $mail->setAddress('lysogordmitry@gmail.ru');
  //Тема письма
  $mail->Subject = 'На обработку Диме';

  //Тело письма
  $body = '<h1>Письмо из моего сайта myProfile</h1>';

  //Проверки
  if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }
  if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }
  if(trim(!empty($_POST['message']))) {
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
  }

  $mail->Body = $body;

  //Отправка

  if (!mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
