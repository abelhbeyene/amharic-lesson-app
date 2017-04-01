<?php

define('SITE', 'http://amharicteacher.com');
define('ROOT', __DIR__);
define('DATA_ROOT', ROOT);

class BuildData {
	private $menus;

	public function __construct() {
		$this->buildMenu();
		//$this->generateJsonFromPages();
	}
	
	/**
	 * Fetch page
	 */
	function fetchPage($url) {
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_ENCODING, 'gzip'); 
		curl_setopt($ch, CURLOPT_HEADER, 1);
		$rawResponse = curl_exec($ch);
		$curlInfo = curl_getinfo($ch);
		curl_close($ch);
		$rawHtml = substr($rawResponse,$curlInfo['header_size']);
		
		return $rawHtml;		
	}

	/**
	 * Use Xpath for easy extraction
	 */
	public function parseHtml($html) {
		// Parse page enabling simple extraction
		$dom = new DOMDocument('1.0', 'UTF-8');
		$dom->preserveWhiteSpace = true;
		@$dom->loadHTML('<?xml version="1.0" encoding="utf-8"?>' . $html);
		$dom->encoding = 'UTF-8';
		$xpath = new DOMXPath($dom);
		
		return $xpath;
	}

	/* Build the menu */
	public function buildMenu() {
		$html = $this->fetchPage(SITE . '/lessons/');
		$xpath = $this->parseHtml($html);
		
		$lessonTitles = $xpath->query("//div[@class='lessoncat']/span");
		$lessonSubTitles = $xpath->query("//div[@class='lessoncat']//ul");
		$menu = [];
		foreach($lessonTitles as $key => $l) {
			$title = $l->textContent;
			if (!$lessonSubTitles->item($key)) continue;

			foreach($lessonSubTitles->item($key)->childNodes as $sl) {
				$subTitle = $sl->textContent;
				$uri = explode('/', trim($sl->firstChild->attributes[0]->nodeValue));
				$menu[$title][] = [	
					'name' 	=> trim($subTitle),
					'data'	=> $uri[count($uri)-2]
				];
			}
		}

		file_put_contents('home.json', json_encode($menu, JSON_PRETTY_PRINT));
		$this->menus = $menu;
	}

	function generateJsonFromPages() {
		foreach($this->menus as $m) {
			foreach($m as $sm) {
				$rawHtml = $this->fetchPage($sm['url']);
				$xpath = $this->parseHtml($rawHtml);
				$list = $xpath->query("//table[@id='lessontable']//ul//li[contains(@class,'cat-post-item')]");
				foreach ($list as $l) {
					var_dump($l->textContent);
					die();
				}
			}
		}
	}
}

new BuildData();