<header id="header" style="margin-bottom:40px;">
  <section class="container clearfix">
    <div class="logo">
      <a href="<?= rtrim($___env['webroot'], '/')?>">
        <img id="site-logo" src="<?= $___env['webroot']?>img/logo.png" alt="Onegai Q&A">
      </a>
      <span>お願い</span>
    </div>
    <nav class="navigation">
      <ul>
        <li ng-class="{current_page_item : url == '/' || url == ''}"><a ui-sref="home">Hỏi đáp</a></li>
        <li ng-class="{current_page_item : url == '/tags'}"><a ui-sref="tags">Các chủ đề</a></li>
        <li ng-class="{current_page_item : url == '/users'}"><a ui-sref="users">Hội viên</a></li>
        <li ng-class="{current_page_item : url == '/questions/ask'}"
            class="pull-right">
          <a ui-sref="ask">Đăng câu hỏi</a>
        </li>
      </ul>
    </nav>
  </section><!-- End container -->
</header>
