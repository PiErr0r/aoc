# Advent of Code

## How to use the `get_day.py` script

#### Session file

1. Create a file named `session`
2. Log In on Advent of Code website
3. Open console (`Ctrl+Shift+i` or simply `F12`)
4. Go to `Storage` tab on Firefox or `Application` tab on Chrome based browser
5. In the sidebar find `Cookies` and locate the one that has your session stored
6. Copy that session to the file you created

#### Running the script

* just run it with python3.7+ and it will tell you what you need to know to use it
* all of the dependencies (imports) should be built-in but as I am not sure run the script and you will probably get some errors

#### Result

* The script creates a folder with the name of year fetched (if the foder doesn't currently exist)
* in the folder it will create 3 files (where {day} represents the day fetched):
    1. `{day}.py`
        - here is initial code with useful imports and separated functions for both parts of the challenge
        - it is also already setup to split the input by lines or something else (depending on the input itself - you have to pick one!)
    2. `{day}_day`
        * here is the text (task) of the day fetched
    3. `{day}_input`
        * which holds the input data for you
* in addition the script will create a file with the exact time when it has fetched the day so you can track your time when solving

## solved

### 2015
[1, 21]

### 2016
{[1, 10] U [12, 22.5] U [23]}

### 2017
[1, 20)

### 2019
[1, 5]
