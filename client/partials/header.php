<div class="row" style="margin-top:30px; margin-bottom:20px;">
  <div class="col-md-4">
    <div id="hlogo">
      <a href="<?= rtrim($___env['webroot'], '/')?>" style="">
        <img id="site-logo" src="<?= $___env['webroot']?>img/logo.png" alt="Onegai Q&A">お願い
      </a>
    </div>
  </div>
  <div class="col-md-8 nav mainnavs">
    <ul ng-controller="menuCtrl" class="nav nav-pills s-menu">
      <li ng-class="{current_page_item : url == '/' || url == ''}"><a ui-sref="home">Hỏi đáp</a></li>
      <li ng-class="{current_page_item : url == '/tags'}"><a ui-sref="tags">Các chủ đề</a></li>
      <li ng-class="{current_page_item : url == '/users'}"><a ui-sref="users">Hội viên</a></li>
      <li ng-class="{current_page_item : url == '/questions/ask'}"
          class="pull-right">
        <a ui-sref="ask">Đăng câu hỏi</a>
      </li>
    </ul>
  </div>
</div>
