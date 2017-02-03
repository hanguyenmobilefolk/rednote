<?php
namespace backend\models;

use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $password;


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['password', 'required'],
            ['password', 'string', 'min' => 6],
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

        $user = new User();
        $user->username = $this->username;
        $user->setPassword($this->password);
        $user->generateAuthKey();
        return $user->save() ? $user : null;
    }

    public function updateUser($id){
        if (($user = User::findOne($id)) !== null) {
            $user->setPassword($this->password);
            return $user->save() ? $user : null;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }

    }

    public function findModel($id)
    {
        if (($model = User::findOne($id)) !== null) {
            $this->username = $model->username;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}
