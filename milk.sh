#!/bin/bash

# GET milks.js ESSENTIAL FILES AND CONCAT THEM ALONG WITH USER CREATED
# ROUTES, PAGES, AND HELPERS

# EXPECTED FILE STRUCTURE
# public/
# -- inc/
# -- lib/
# -- -- milksjs/
# -- pages/
# -- routes.js

# FILE LOADING ORDER
# public/lib/milksjs/polyfill.js
# public/lib/milksjs/Page.js
# public/inc/*.js
# public/pages/*.js
# public/routes.js
# public/lib/milksjs/Router.js

# COMPILES INTO > publc/milks.js

STRUCTURE="EXPECTED FILE STRUCTURE:\npublic/\n-- inc/*.js\n-- lib/\n-- -- milksjs/\n-- pages/*.js\n-- routes.js\n"

cd ../.. # cd to 'public/' directory

> milks.js # clean file

# echo "/******************** \n * POLYFLL \n ********************/ \n" >> milks.js
# cat ./lib/milksjs/polyfill.js >> milks.js
# echo "\n\n"

if [ ! -f "./lib/milksjs/Page.js" ]; then
	tput setaf 1; echo "ERROR: Essential file: Page.js cannot be found at ./lib/milksjs/Page.js\n"
	echo $STRUCTURE
	> milks.js # clean file
	exit
else
	echo "/******************** \n * PAGE CLASS \n ********************/ \n" >> milks.js
	cat ./lib/milksjs/Page.js >> milks.js
	echo "\n\n" >> milks.js
fi


helpers_count=`ls -1 ./inc/*.js 2>/dev/null | wc -l`
if [ "$helpers_count" -eq "0" ]; then
	tput setaf 3; echo "WARNING: Helper JS files cannot be found at ./inc/*.js\n"
else
	echo "/******************** \n * USER CREATED INCLUDES \n ********************/ \n" >> milks.js
	# loop through includes
	for file in ./inc/*.js
	do
		cat $file >> milks.js
		echo "\n\n" >> milks.js
	done
fi


pages_count=`ls -1 ./pages/*.js 2>/dev/null | wc -l`
if [ "$pages_count" -eq "0" ]; then
	tput setaf 3; echo "WARNING: No pages were found at ./pages/*.js\n"
else
	echo "/******************** \n * USER CREATED PAGES \n ********************/ \n" >> milks.js
	# loop through pages
	for file in ./pages/*.js
	do
		cat $file >> milks.js
		echo "\n\n" >> milks.js
	done
fi


if [ ! -f "./routes.js" ]; then
	tput setaf 1; echo "ERROR: Essential file: routes.js cannot be found at ./routes.js\n"
	echo $STRUCTURE
	> milks.js # clean file
	exit
else
	echo "/******************** \n * ROUTES BY USER \n ********************/ \n" >> milks.js
	cat ./routes.js >> milks.js
	echo "\n\n" >> milks.js
fi


if [ ! -f "./lib/milksjs/Router.js" ]; then
	tput setaf 1; echo "ERROR: Essential file: Router.js cannot be found at ./lib/milksjs/Page.js\n"
	echo $STRUCTURE
	> milks.js # clean file
	exit
else
	echo "/******************** \n * ROUTER \n ********************/ \n" >> milks.js
	cat ./lib/milksjs/Router.js >> milks.js
fi