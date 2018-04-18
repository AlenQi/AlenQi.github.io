#!/bin/sh

current_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
blog_folder=AlenQi.github.io
entry_folder=blog-entry

if [ $current_branch = master ]

then

  echo "Bundling..."

  cd ../"$entry_folder"

  # copy necessary files to blog_folder
  declare -a entry_files=(entry/ entry.html)
  for file in "${entry_files[@]}"
  do
    cp -R ./"$file" ../"$blog_folder"/public/"$file"
  done

  cd ../"$blog_folder"

  git add .

  git commit -m "Build Date [`date +%Y-%m-%d:%H:%M:%S`]"

  git push origin master

  echo "Build Successfully at [`date +%Y-%m-%d:%H:%M:%S`]"

else
  # Define ANSI color variable
  RED='\033[0;31m'
  NC='\033[0m'

  echo "${RED}Current branch isn't [master]${NC}"
fi
