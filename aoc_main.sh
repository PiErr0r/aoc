if [ $# -eq 0 ]; then
    echo "Defaulting to 'js' ext";
    EXT="js";
else
    EXT=$1;
fi

# echo https://adventofcode.com/`date +"%Y %e"`;
./get_day.py `date +"%Y %e"` $EXT;
if [ $? == 0 ];
then
    subl `date +"%Y"`/`date +"%d"`*
else
    echo "Not able to open files in Sublime since an error occurred";
fi
