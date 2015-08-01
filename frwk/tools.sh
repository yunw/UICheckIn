#!/bin/bash

findStr=$1
rplceStr=$2


renameDir()
#based on: for i in *; do echo mv $i ${i/somewhere/elsewhere}; done |sh
{
for i in *; do echo mv $i ${i/${findStr}/${rplceStr}}; done
res=$?
if [ ${res} -eq 0 ]; then
  echo "1"
  for i in *; do echo mv $i ${i/${findStr}/${rplceStr}}; done |sh
fi

}

renameSubDir()
{

echo "find . -type f -name '${findStr}*'"
for f in $(find . -type f -name '${findStr}*'); do
    echo $f
    mv $f $(echo "$f" | sed 's/${findStr}/${rplceStr}/')
done

 }



renameSubSDir()
{
for f in $(find . -type f -name '*Pos*'); do
    echo $f
    mv $f $(echo "$f" | sed 's/Pos/P/')
done

 }



renameSubSDir

echo 'done'