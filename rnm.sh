
function rename_dot() {
  for i in [0-9].*; do
    mv $i 0$i;
  done;
}

function rename_us() {
  for i in [0-9]_*; do
    mv $i 0$i;
  done;
}


for i in {2015..2017}; do
  cd $i;
  pwd
  rename_dot
  rename_us
  cd ..;
done;

