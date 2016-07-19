<?php $___env['webroot'] = '/client/'; ?>
<?php $___env[''] = ''; ?>
<?php $___env[''] = ''; ?>
<?php $___env[''] = ''; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Nơi hỏi đáp về tiếng Nhật và Nhật bản">
  <meta name="author" content="Onegai Q&A site">
  <link rel="shortcut icon" href="<?= $___env['webroot']?>img/favicon.ico">
  <title>Onegai | Q&A site</title>
  <!-- Bootstrap core CSS -->
  <link href="./vendor/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
  <!-- Onegai CSS -->
  <link href="./css/base.css" rel="stylesheet">
  <link href="./css/app.css" rel="stylesheet">
  <link href="./css/question.css" rel="stylesheet">
  <link href="./css/answer.css" rel="stylesheet">
  <link href="./css/tags.css" rel="stylesheet">
  <link href="./css/users.css" rel="stylesheet">
  <link href="./vendor/textAngular/src/textAngular.css" rel="stylesheet">
  <link href="./css/responsive.css" rel="stylesheet">
  <!-- Custom styles for this template -->
  <base href="/">
</head>
<body ng-app="onegai">
<!-- Top bar -->
<div id="header-top">
  <section class="container clearfix">
    <nav class="header-top-nav">
      <ul>
        <li><a href=""><i class="fa fa-headphones"></i>Hỗ trợ</a></li>
        <li><a href=""><i class="fa fa-user"></i>Đăng nhập</a></li>
        <li>
          <a href=""><span class="mail-status unread">1 </span><i class="fa fa-inbox"></i></a>
        </li>
      </ul>
    </nav>
    <div class="header-search">
      <form method="get" action="/search">
        <input type="text" value="Tìm kiếm ..." onfocus="if(this.value=='Tìm kiếm ...')this.value='';"
               onblur="if(this.value=='')this.value='Tìm kiếm ...';" name="q" autocomplete="off">
        <button type="submit" class="search-submit"></button>
      </form>
    </div>
  </section><!-- End container -->
</div><!-- End header-top -->
<!-- Main container -->
<div class="container" style="padding-bottom: 30px;">
  <div class="row">
    <!-- Header -->
    <?php include 'partials/header.php';?>
    <!-- Main content -->
    <div ui-view></div>
  </div>
</div>
<!-- Footer -->
<?php include 'partials/footer.php';?>
<!-- Vendor libraries -->
<script src="<?= $___env['webroot']?>vendor/jquery/dist/jquery.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/angular/angular.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/angular-route/angular-route.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/angular-ui-router/release/angular-ui-router.js"></script>
<script src="<?= $___env['webroot']?>vendor/textAngular/dist/textAngular-rangy.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/textAngular/dist/textAngular-sanitize.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/textAngular/dist/textAngular.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/lodash/dist/lodash.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/restangular/dist/restangular.min.js"></script>
<script src="<?= $___env['webroot']?>vendor/async/lib/async.js"></script>
<script src="<?= $___env['webroot']?>vendor/momentjs/min/moment.min.js"></script>
<!-- Extend libraries -->
<script src="<?= $___env['webroot']?>js/lib/ui-bootstrap-0.11.0.min.js"></script>
<!-- REST Service -->
<script src="<?= $___env['webroot']?>js/services/main.js"></script>
<script src="<?= $___env['webroot']?>js/services/userService.js"></script>
<script src="<?= $___env['webroot']?>js/services/tagsService.js"></script>
<script src="<?= $___env['webroot']?>js/services/questionsService.js"></script>
<script src="<?= $___env['webroot']?>js/services/answersService.js"></script>
<!-- Angular app variable with the controllers -->
<script src="<?= $___env['webroot']?>js/modules/app.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/menuCtrl.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/askCtrl.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/tagsCtrl.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/usersCtrl.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/answerCtrl.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/answerEditCtrl.js"></script>
<script src="<?= $___env['webroot']?>js/controllers/homeCtrl.js"></script>
</body>
</html>
