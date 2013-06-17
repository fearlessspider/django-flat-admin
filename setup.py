from setuptools import setup

setup(
    name='django-flat-admin',
    version=__import__('flat_admin').VERSION,
    description='Modern Flat theme for Django Admin',
    author='QQWDG',
    author_email='support@eggforsale.com',
    url='http://eggforsale.com',
    packages=['flat_admin', 'flat_admin.templatetags'],
    zip_safe=False,
    include_package_data=True,
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Framework :: Django',
        'License :: Free for non-commercial use',
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Environment :: Web Environment',
        'Topic :: Software Development',
        'Topic :: Software Development :: User Interfaces',
    ]
)
