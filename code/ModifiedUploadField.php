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
		
		/*
			TODO:
				* many_many
				* overwrites self with blank value
						EITHER
							have it insert the hidden field very time
						OR
							have a way to check if value was set before doing this
								would need to tell difference between not set and 
		*/
		
		if($record->has_one($fieldName)) {
			$record->{$fieldName . 'ID'} = $value;
		}
		
		return $this;
	}
	
}