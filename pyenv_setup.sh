#! /usr/bin/bash 
# sudo apt update 
# sudo apt install python-pip 
my_app_path=$( dirname $(readlink -f "$0"))
echo $my_app_path
python -m venv "$my_app_path/Backend/pyenv"

source "$my_app_path/Backend/pyenv/bin/activate"
echo $(pwd)
pip install --upgrade pip
pip install -r "$my_app_path/Backend/python_requirements.txt"
django-admin
