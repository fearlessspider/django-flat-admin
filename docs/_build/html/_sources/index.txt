.. Django Flat Admin documentation master file, created by
   sphinx-quickstart on Mon Jul 29 22:30:32 2013.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Django Flat Admin's documentation!
=============================================
Django Flat Admin - modern flat theme for Django Framework admin interface.

About
-----
Django Flat Admin is alternative admin/app theme for Django Framework admin app.

Features
--------
* Modern flat and professional design
* Useful CSS/JS addons
* Based on Twitter Bootstrap
* Simple installation
* CKEditor for textareas

Licence
-------
Django Flat Admin is licensed under Creative Commons Attribution-NonCommercial 3.0 license.

Licence and pricing: http://www.eggforsale.com

* Non-commercial http://www.eggforsale.com/product/django-flat-admin/2/
* Single commercial project http://www.eggforsale.com/product/django-flat-admin/3/
* Unlimited commercial projects http://www.eggforsale.com/product/django-flat-admin/4/
* OEM integrator licence http://www.eggforsale.com/product/django-flat-admin/5/

Authors and Contributors
------------------------
bespider (@bespider) for EggForSale (@eggforsale) created Django Flat Admin.

Installation
============

1. You can get Django Flat Admin from github
2. You will need to add the 'flat-admin' application to the INSTALLED_APPS setting of your Django project settings.py file.::

    INSTALLED_APPS = (
        ...
        'flat_admin',
        'django.contrib.admin',
    )

3. You also need to add 'django.core.context_processors.request' to TEMPLATE_CONTEXT_PROCESSORS setting in your Django project settings.py file.::

    TEMPLATE_CONTEXT_PROCESSORS = (
        ...
        'django.core.context_processors.request',
        ...
    )

Support or Contact
==================
Having trouble with Django Flat Admin? Check out the detail page at http://www.eggforsale.com or contact support@eggforsale.com and we’ll help you sort it out.

Contents:

.. toctree::
   :maxdepth: 2



Indices and tables
==================

* :ref:`genindex`
* :ref:`search`

