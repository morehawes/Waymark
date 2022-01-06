<?php

require_once('Waymark_Object.php');
	
class Waymark_Query extends Waymark_Object {
	
	public $post_type = 'waymark_query';
	
	function __construct($post_id = null) {
 		$marker_types = Waymark_Helper::get_object_types('marker', 'marker_title', true);
 		$default_marker_type = array_keys($marker_types)[0];

		$line_types = Waymark_Helper::get_object_types('line', 'line_title', true);
		$default_line_type = array_keys($line_types)[0];
	
		//Query Data
		$this->parameters = array(
			'query_area' => array(
				'input_types' => array('meta'),
				'name' => 'query_area',
				'id' => 'query_area',
				'type' => 'text',				
//				'tip' => 'Query Area.',
				'group' => '',
				'title' => 'query_area',
				'default' => Waymark_Config::get_setting('query', 'defaults', 'query_area'),
				'class' => 'waymark-hidden'
			),					
			'query_overpass' => array(
				'input_types' => array('meta'),
				'name' => 'query_overpass',
				'id' => 'query_overpass',
				'type' => 'textarea',				
				'tip' => 'Overpass Turbo Query. {{bbox}} will be replaced by the Map area.',
				'group' => '',
				'title' => 'Overpass Turbo Query',
				'default' => Waymark_Config::get_setting('query', 'defaults', 'query_overpass'),
				'output_processing' => array(
					'html_entity_decode($param_value)'
				)				
			),
			'query_cast_overlay' => array(
				'input_types' => array('meta'),
				'name' => 'query_cast_overlay',
				'id' => 'query_cast_overlay',
				'type' => 'select',				
				'tip' => 'Marker/Line/Shape',
				'group' => '',
				'title' => 'Overlay Type',
				'default' => Waymark_Config::get_setting('query', 'defaults', 'query_cast_overlay'),
				'options' => [
					'marker' => 'Marker',
					'line' => 'Line',
//					'shape' => 'Shape'										
				]
			),
			'query_cast_marker_type' => array(
				'input_types' => array('meta'),
				'name' => 'query_cast_marker_type',
				'id' => 'query_cast_marker_type',
				'type' => 'select',				
				'tip' => 'Cast to Type',
				'group' => '',
				'title' => 'Marker Type',
				'default' => $default_marker_type,
				'options' => Waymark_Helper::get_object_types('marker', 'marker_title', true)
			),
			'query_cast_line_type' => array(
				'input_types' => array('meta'),
				'name' => 'query_cast_line_type',
				'id' => 'query_cast_line_type',
				'type' => 'select',				
				'tip' => 'Cast to Type',
				'group' => '',
				'title' => 'Line Type',
				'default' => $default_line_type,
				'options' => Waymark_Helper::get_object_types('line', 'line_title', true)
			),											
			//!!!
			'query_data' => array(
				'input_types' => array('meta'),
				'name' => 'query_data',
				'id' => 'query_data',
				'type' => 'textarea',				
				'group' => '',
				'title' => 'Query Data',
//				'class' => 'waymark-hidden'
			)			
		);

		parent::__construct($post_id);
	}		
	
	function create_form() {
		if(! is_admin()) {
			return;
		}
		
		//Load existing data		
		if(isset($this->data['query_data']) && Waymark_GeoJSON::get_feature_count($this->data['query_data'])) {
			Waymark_JS::add_call('Waymark_Map_Viewer.load_json(' . $this->data['query_data'] . ', false);');								
		}

		//Already exists
		if(isset($this->data['query_overpass']) && isset($this->data['query_area'])) {
			$query_overpass = $this->data['query_overpass'];
			$query_area_array = explode(',', $this->data['query_area']);
		//Default
		} else {
			$query_overpass = Waymark_Config::get_setting('query', 'defaults', 'query_overpass');
			$query_area_array = explode(',', Waymark_Config::get_setting('query', 'defaults', 'query_area'));		
		}
		
// 		Waymark_Helper::debug($query_overpass, false);
// 		Waymark_Helper::debug($query_area_array, true);
				
		//Area
		$query_leaflet_string = '[[' . $query_area_array[1] . ',' . $query_area_array[0] . '],[' . $query_area_array[3] . ',' . $query_area_array[2] . ']]';
		$query_overpass_string = $query_area_array[1] . ',' . $query_area_array[0] . ',' . $query_area_array[3] . ',' . $query_area_array[2];

		//Bounding Box
		Waymark_JS::add_call('
	//Query
	var bounds = ' . $query_leaflet_string . ';
	var rectangle = L.rectangle(bounds, {
		color: "#ff7800",
		weight: 1
	}).addTo(Waymark_Map_Viewer.map);
	rectangle.enableEdit();
	Waymark_Map_Viewer.map.on(\'editable:vertex:dragend\', function(e) {
		jQuery(\'#query_area\').val(e.layer.getBounds().toBBoxString());
	});
	Waymark_Map_Viewer.map.fitBounds(bounds)');						

		//Build request
		$Request = new Waymark_Overpass_Request();							
		$Request->set_config('bounding_box', $query_overpass_string);
		$Request->set_parameters(array(
			'data' => html_entity_decode($query_overpass)
		));

		//Execute request
		$response = $Request->get_processed_response();
		
		//Success
		if(! array_key_exists('error', $response)) {
			$response_geojson = [];						

			//What kind of Overlay?
			switch($this->data['query_cast_overlay']) {
				//Markers
				case 'marker' :
					if(array_key_exists('nodes', $response)) {
						$response_geojson = $response['nodes'];

						$response_geojson = Waymark_GeoJSON::update_feature_property($response_geojson, 'type', $this->data['query_cast_marker_type']);						
					}

					break;

				//Lines
				case 'line' :
					//Lines
					if(array_key_exists('ways', $response)) {
						$response_geojson = $response['ways'];						

						$response_geojson = Waymark_GeoJSON::update_feature_property($response_geojson, 'type', $this->data['query_cast_line_type']);
					}								

					break;
			}
		

			$this->data['query_data'] = $response_geojson;
			$this->save_meta();
			
			Waymark_JS::add_call('Waymark_Map_Viewer.load_json(' . $response_geojson . ', false);');								
		//Error
		} else {
			echo $response['error'];
		}

		echo Waymark_Helper::build_query_map_html();
	
		return parent::create_form();	
	}
}