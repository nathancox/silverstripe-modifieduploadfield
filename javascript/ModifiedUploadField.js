(function($) {
	
	$.entwine('ss', function($) {
		$('div.ss-upload.modifiedupload').entwine({
			onmatch: function() {
			
				if(this.is('.readonly,.disabled')) return;
				
				// modified by nathan
				var fileInput = this.find('input[type="file"]');
				
				var dropZone = this.find('.ss-uploadfield-dropzone');
				var config = $.parseJSON(fileInput.data('config').replace(/'/g,'"'));				
				
				/* Attach classes to dropzone when element can be dropped*/
				$(document).unbind('dragover');
				$(document).bind('dragover', function (e) {
					timeout = window.dropZoneTimeout;
					var $target = $(e.target);
					if (!timeout) {
						dropZone.addClass('active');
					} else {
						clearTimeout(timeout);
					}
					if ($target.closest('.ss-uploadfield-dropzone').length > 0) {
						dropZone.addClass('hover');
					} else {
						dropZone.removeClass('hover');
					}
					window.dropZoneTimeout = setTimeout(function () {
						window.dropZoneTimeout = null;
						dropZone.removeClass('active hover');
					}, 100);
				});
				
				//disable default behaviour if file dropped in the wrong area
				$(document).bind('drop dragover', function (e){					
					e.preventDefault(); 
				});



				this.setConfig(config);
				this.fileupload($.extend(true, 
					{
						formData: function(form) {
							var idVal = $(form).find(':input[name=ID]').val();
							if(!idVal) {
								idVal = 0;
							}
							
							return [
								{name: 'SecurityID', value: $(form).find(':input[name=SecurityID]').val()},
								{name: 'ID', value: idVal}
							];
						},
						errorMessages: {
							// errorMessages for all error codes suggested from the plugin author, some will be overwritten by the config comming from php
							1: ss.i18n._t('UploadField.PHP_MAXFILESIZE'),
							2: ss.i18n._t('UploadField.HTML_MAXFILESIZE'),
							3: ss.i18n._t('UploadField.ONLYPARTIALUPLOADED'),
							4: ss.i18n._t('UploadField.NOFILEUPLOADED'),
							5: ss.i18n._t('UploadField.NOTMPFOLDER'),
							6: ss.i18n._t('UploadField.WRITEFAILED'),
							7: ss.i18n._t('UploadField.STOPEDBYEXTENSION'),
							maxFileSize: ss.i18n._t('UploadField.TOOLARGESHORT'),
							minFileSize: ss.i18n._t('UploadField.TOOSMALL'),
							acceptFileTypes: ss.i18n._t('UploadField.INVALIDEXTENSIONSHORT'),
							maxNumberOfFiles: ss.i18n._t('UploadField.MAXNUMBEROFFILESSHORT'),
							uploadedBytes: ss.i18n._t('UploadField.UPLOADEDBYTES'),
							emptyResult: ss.i18n._t('UploadField.EMPTYRESULT')
						},
						send: function(e, data) {
								if (data.context && data.dataType && data.dataType.substr(0, 6) === 'iframe') {
										// Iframe Transport does not support progress events.
										// In lack of an indeterminate progress bar, we set
										// the progress to 100%, showing the full animated bar:
										data.total = 1;
										data.loaded = 1;
										$(this).data('fileupload').options.progress(e, data);
								}
						},
						progress: function(e, data) {
									if (data.context) {
										var value = parseInt(data.loaded / data.total * 100, 10) + '%';
										data.context.find('.ss-uploadfield-item-status').html((data.total == 1)?ss.i18n._t('UploadField.LOADING'):value);
										data.context.find('.ss-uploadfield-item-progressbarvalue').css('width', value);
									}
							}
					}, 
					config, 
					{
						fileInput: fileInput,
						form: $(fileInput).closest('form'),				// test addition by nathan
						dropZone: dropZone,
						previewAsCanvas: false,
						acceptFileTypes: new RegExp(config.acceptFileTypes, 'i')
					}
				));
				if (this.data('fileupload')._isXHRUpload({multipart: true})) {
					$('.ss-uploadfield-item-uploador').show();
					dropZone.show(); // drag&drop avaliable
					
				}

				
			//	this._super();
			}

		});
	});
	
	
}(jQuery));