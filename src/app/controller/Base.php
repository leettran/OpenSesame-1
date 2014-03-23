<?php

namespace controller;

use core as c;
use util as u;
use model as m;

class Base implements c\IController
{
    public $outputType = c\Output::TYPE_HTML;

    public function handle()
    {
        $aConfig = c\Config::get('dsn');
        u\DB::getInstance($aConfig['data']);

        $aData['data'] = $this->run();
        $aData['data']['host'] = 'http://' . $_SERVER['HTTP_HOST'] . '/';

        if ($this->outputType === c\Output::TYPE_HTML) {
            $aData[c\Output::TYPE_HTML] = [
                    'header' => $this->getHeader(),
                    'body' => $this->getBody(),
                    'footer' => $this->getFooter(),
            ];
        }

        return $aData;
    }

    protected function get($sName)
    {
        return (isset($_GET[$sName])) ? $_GET[$sName] : '';
    }

    protected function post($sName)
    {
        return (isset($_POST[$sName])) ? $_POST[$sName] : '';
    }

    public function getOutputType()
    {
        return $this->outputType;
    }

    public function before()
    {
        return true;
    }

    public function after()
    {
        return true;
    }

    protected function getHeader()
    {
        return 'Header';
    }

    protected function getFooter()
    {
        return 'Footer';
    }
}

# end of this file
