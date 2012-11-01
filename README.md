SilverStripe ModifiedUploadField
=================

Repository for bug fixes and feature additions I'm experimenting with on SS3's UploadField.  Not very well tested at this point.

Maintainer Contacts
-------------------
*  Nathan Cox (<nathan@flyingmonkey.co.nz>)

Requirements
------------
* SilverStripe 3.0+

Documentation
-------------
[GitHub](https://github.com/nathancox/silverstripe-modifieduploadfield)

Installation Instructions
-------------------------

1. Place the files in a directory called ModifiedTableField in the root of your SilverStripe installation
2. Visit yoursite.com/dev/build to rebuild the database

Overview
--------------

Usage is just like a regular UploadField, but you make a ModifiedUploadField.

*What this field does differently from UploadField*

1. Fixed the bug where the UploadField couldn't upload after refreshing the page
2. Should now be able to upload images on a create new dataobject page without saving first

Note that number 2 above only works has has_one (not many_many) relations and only with uploading (not attaching existing files yet).



Known Issues
------------
[Issue Tracker](https://github.com/nathancox/silverstripe-modifieduploadfield/issues)