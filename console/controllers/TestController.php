<?php

namespace console\controllers;

use yii\console\Controller;

/**
 * Test controller
 */
class TestController extends Controller {

    public function actionIndex() {
        echo "cron service runnning";
    }

    public function actionConnect($ip,$port) {
        $fp = stream_socket_client("tcp://$ip:$port", $errno, $errstr, 30);
        if (!$fp) {
            echo "$errstr ($errno)<br />\n";
        } else {
            $data = json_encode(['call_type'=>'plan','call_data'=>['plan_id'=>1]]);
            fwrite($fp, $data."\n");
            echo stream_get_contents($fp);
            /*while (!feof($fp)) {
                echo fgets($fp, 1024);
            }*/
            fclose($fp);
        }
    }

    function actionConnect2($host,$port){
        //$data = json_encode(['call_type'=>'plan','call_data'=>['plan_id'=>1]]);
        $data = "test";
        echo $data;
        if ( ($socket = socket_create(AF_INET, SOCK_STREAM, IPPROTO_IP)) === FALSE )
            echo "socket_create() failed: reason: " . socket_strerror(socket_last_error());
        else
        {
            echo "Attempting to connect to '$host' on port '$port'...<br>";
            try {
                if (($result = socket_connect($socket, $host, $port)) === FALSE)
                    echo "socket_connect() failed. Reason: ($result) " . socket_strerror(socket_last_error($socket));
                else {
                    echo "Sending data...<br>";
                    /*$result_socket_write = socket_write($socket, $data, strlen($data));*/
                    if( ! socket_send ( $socket , $data , strlen($data) , 0))
                    {
                        $errorcode = socket_last_error();
                        $errormsg = socket_strerror($errorcode);

                        die("Could not send data: [$errorcode] $errormsg \n");
                    }


                    echo "Reading response:<br>";
                    echo "Message send successfully \n";

//Now receive reply from server
                   /* if(socket_recv ( $socket , $buf , 2045 , MSG_WAITALL ) === FALSE)
                    {
                        $errorcode = socket_last_error();
                        $errormsg = socket_strerror($errorcode);

                        die("Could not receive data: [$errorcode] $errormsg \n");
                    }
                    echo $buf;*/
                    while ($out = socket_read($socket, 2048)) {
                         echo $out;
                     }
                }
            }catch (\Exception $e){
                echo 'Connect failed';
                socket_close($socket);
            }
            socket_close($socket);
        }
    }

    function actionTestSocket($host,$port){
        //Create socket
        if (! $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) {
            $this->showError('socket create');
        }
        echo "Server Created\n";

        //Bind socket

        if (!socket_bind($socket, $host, $port)) {
            $this->showError('socket bind');
        }
        echo "Server bind to $host and $port \n";

        if (!socket_listen($socket)) {
            $this->showError('socket listen');
        }
        echo "Server Listening \n";

        do {
            $client = socket_accept($socket);
            echo "connection established\n";

            $message = "\n Hey! welcome to the server\n";
            socket_write($client, $message, strlen($message));

            do {
                if (! socket_recv($client, $clientMessage, 2045, MSG_WAITALL)) {
                    $this->showError('socket receive');
                }
                $message = "Command Received\n";
                echo $clientMessage;

                socket_send($client, $message, strlen($message), 0);

                if (!$clientMessage = trim($clientMessage)) {
                    continue;
                }

                if (trim($clientMessage) == 'close') {
                    socket_close($client);
                    echo "\n\n--------------------------------------------\n".
                        "ClientRequest terminated\n";
                    break 1;
                }
            } while(true);

        } while(true);
    }

    private function showError($message) {
        echo ("Error: ".$message);
        exit(666);
    }
}