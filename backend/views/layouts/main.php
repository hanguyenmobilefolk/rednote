<?php

/* @var $this \yii\web\View */
/* @var $content string */

use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use common\widgets\Alert;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => 'VEAM',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    $menuItems = [
        ['label' => 'Home', 'url' => ['/site/index']],
    ];
    if (Yii::$app->user->isGuest) {
        $menuItems[] = ['label' => 'Login', 'url' => ['/site/login']];
    } else {
        $menuItems[] = [
            'label' => 'Quản lí nhân viên',
            'items' => [
                ['label' => 'Nhân viên', 'url' => ['/user']],
                ['label' => 'Công nhân', 'url' => ['/employee']]
            ]
        ];

        $menuItems[] = [
            'label' => 'Quản lí cấu hình',
            'items' => [
                ['label' => 'Ngày lễ', 'url' => ['/holiday']],
                ['label' => 'Giờ giải lao', 'url' => ['/break-time']],
                ['label' => 'Mã Downtime', 'url' => ['/downtime-code']],
                ['label' => 'Mã NG', 'url' => ['/ng-code']],
                ['label' => 'Cấu hình chung', 'url' => ['/config']]
            ]
        ];
        $menuItems[] = [
            'label' => 'Quản lí sản xuất',
            'items' => [
                ['label' => 'Quản lí PMD', 'url' => ['/ip-config']],
                ['label' => 'Quản lí phụ kiện', 'url' => ['/item-code']],
                ['label' => 'Quản lí model', 'url' => ['/product-model']],
                ['label' => 'Quản lí plan', 'url' => ['/plan']],
                ['label' => 'Quản lí kho', 'url' => ['/stock']]
            ]
        ];

        $menuItems[] = '<li>'
            . Html::beginForm(['/site/logout'], 'post')
            . Html::submitButton(
                'Logout (' . Yii::$app->user->identity->username . ')',
                ['class' => 'btn btn-link']
            )
            . Html::endForm()
            . '</li>';
    }
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => $menuItems,
    ]);
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
