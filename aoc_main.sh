if [ $# -eq 0 ]; then
    echo "No arguments provided"
    echo
    echo "usage: $0 <ext>"
    echo "where <ext> is 'py' or 'js'"
    exit 1
fi

./get_day.py `date +"%Y %e"` $1; subl `date +"%Y"`/`date +"%d"`*
