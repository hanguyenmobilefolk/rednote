<?php
namespace api\modules\v1\controllers;

use api\models\Render;
use yii\rest\Controller;
use Yii;

class RenderingVideoController extends Controller
{

    public function behaviors()
    {
        return [
            [
                'class' => \yii\filters\ContentNegotiator::className(),
                'formats' => [
                    'application/json' => \yii\web\Response::FORMAT_JSON,
                ],
            ],
        ];
    }

    public function actionIndex()
    {
		set_time_limit (200);
        $request = Yii::$app->request;
        $path_bat_file = Yii::getAlias('@api').DIRECTORY_SEPARATOR.'modules'.DIRECTORY_SEPARATOR.'v1'.DIRECTORY_SEPARATOR.'controllers'.DIRECTORY_SEPARATOR;
        system("cmd /c {$path_bat_file}run_ps.bat",$result);
       
        return [$result];
	   //return [];
    }

    public function actionRender()
    {
        set_time_limit(1000);
        $request = Yii::$app->request;
        $lyrics = json_decode($request->post('lyrics'),true);
        $clipName = $request->post('clipName');
        $comp_name = $request->post('compName');
        $videoName = $request->post('videoName');
        $fontType = $request->post('fontType');
        $textColor = $request->post('textColor');
        $backgroundImage = $request->post('bgrImage');;
        try {
            $render = new Render();
            $render->lyrics = $lyrics;
            $render->clipName = $clipName;
            $render->compositeName = $comp_name;
            $render->fontType = $fontType;
            $render->textColor = $textColor;
            $render->backgroundImage = $backgroundImage;
            $render->videoName = $videoName;
            $result = $render->renderVideo();
            return [
                'success' => true,
                'data' => 'success'
            ];
        }catch (\Exception $e){
            return [
                'success' => false,
                'data' => $e->getMessage()
            ];
        }

    }
}