<?php

class ModifiedUploadField extends UploadField {
	
	public function __construct($name, $title = null, SS_List $items = null) {
		$this->addExtraClass('upload');
		$this->addExtraClass('ss-modifieduploadfield');
		
	//	print_r($items);
		
		parent::__construct($name, $title, $items);
		
		$this->setConfig('downloadTemplateName', 'ss-modifieduploadfield-downloadtemplate');
	}
	
	public function Field($properties = array()) {
		$output = parent::Field($properties);
		
		Requirements::javascript('ModifiedUploadField/javascript/ModifiedUploadField_downloadtemplate.js');
		Requirements::javascript('ModifiedUploadField/javascript/ModifiedUploadField.js');

		return $output;
	}
	
	public function saveInto(DataObjectInterface $record) {
		$value = $this->value;
		$fieldName = $this->getName();
		
		if($record->has_one($fieldName)) {
			$record->{$fieldName . 'ID'} = $value;
		}
		
		return $this;
	}
	
	public function managesRelation() {
		$record = $this->getRecord();
		
		if ($record == null) {
			$record = $this->getBlankRecordObject();
		}
		
		$fieldName = $this->getName();
		return (
			$record 
			&& ($record->has_one($fieldName) || $record->has_many($fieldName) || $record->many_many($fieldName))
		);
	}
	
	
	function getBlankRecordObject() {
		$controller = $this->form->Controller();
		
		if ($controller->class == 'GridFieldDetailForm_ItemRequest' || is_subclass_of($controller->class, 'RequestHandler')) {
			$class = $controller->getGridField()->getModelClass();
			$object = new $class();
			return $object;
		}
		
		return null;
	}
	

	
}