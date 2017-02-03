<?php

namespace api\models;

use Yii;
use yii\base\Exception;
use yii\db\ActiveRecord;
use yii\helpers\FileHelper;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $username
 * @property string $password_hash
 * @property integer $status
 * @property integer $created_at
 * @property integer $updated_at
 */
class Render extends ActiveRecord
{

    public $lyrics;
    public $clipName;
    public $compositeName;
    public $fontType;
    public $textColor;
    public $backgroundImage;
    public $videoName;
    public static $fontTypeList = [
        'Amatic',
        'Nunito',
        'Playfair Display',
        'Playfair Display SC',
        'PhotoWall Sans Shadow',
        'Breathe (OTT)'
    ];
    public static function tableName()
    {
        return 'videos';
    }


    public function rules()
    {
        return [
        ];
    }


    public function attributeLabels()
    {
        return [
        ];
    }

    public function renderVideo(){
        $current_time = new \DateTime();
        $dst_video_path  =  Yii::getAlias('@api').DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.$current_time->format('Y_m_d_H_i_s').DIRECTORY_SEPARATOR;
        $src_video_path =  Yii::getAlias('@api').DIRECTORY_SEPARATOR.'clips'.DIRECTORY_SEPARATOR.'composite_'.$this->compositeName;
        try{
            FileHelper::copyDirectory($src_video_path,$dst_video_path,['dirMode'=>0777]);
            $script_file_path = $dst_video_path.'script.jsx';
            $new_script_file_path = $dst_video_path."new_script.jsx";
            if(file_exists($script_file_path)){
                $content_script = file_get_contents($script_file_path);
                $count_lyric = 1;
                $lyric_var = '';
                $temp_lyric_arr= [];

                foreach ($this->lyrics as $lyric){
                    $lyric_var .= 'var lyrics'.$count_lyric.' = "'.$lyric.'";';
                    $temp_lyric_arr[]="lyrics{$count_lyric}";
                    $count_lyric++;
                }
                $temp_lyric_arr = implode(', ',$temp_lyric_arr);
                $lyric_var.="var lyrics = [{$temp_lyric_arr}];";

                $new_content = 'var clipPath=""
var clipName = "source_audio.wav"
'.$lyric_var.'
var fontType = "'.$this->fontType.'";
var hexColor = "'.$this->textColor.'";
var imageName = "'.$this->backgroundImage.'";
'.$content_script;

                file_put_contents($new_script_file_path,$new_content);
                $src_audio = $dst_video_path.$this->clipName;
                $dst_audio = $dst_video_path.'source_audio.wav';
                $src_video= $dst_video_path.$this->videoName.".mov";
                $dst_video = $dst_video_path.$this->videoName.".mp4";
                //pclose(popen("start /realtime /b cmd /c {$dst_video_path}render_video.bat $dst_video_path $src_video $dst_video $this->compositeName $src_audio $dst_audio", "r"));

                system("cmd /c {$dst_video_path}render_video.bat $dst_video_path $src_video $dst_video $this->compositeName $src_audio $dst_audio",$result);
                var_dump($result);die;
            }
            return true;
        }catch (Exception $e){
            throw $e;
        }finally{
            return false;
        }



    }
}
