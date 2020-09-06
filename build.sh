#!/bin/bash

# install dependencies
echo start install node_modules
yarn

# build assets
yarn ci

# build images

timestamp=`date "+%Y%m%d%H%M%S"`
prefix="route-proxy"
containerName="react-proxy";
tag="$prefix:$timestamp"

docker build -t "$tag" .

# stop current container

have=$(docker inspect --format='{{.Name}}' $(docker ps -aq) |grep $containerName  | cut -d"/" -f2)
if [[ "$have" == "$containerName" ]]; then
  docker container stop $containerName
  docker container rm $containerName
fi

# remove prev images

tags=$(docker images | grep $prefix | awk '{print $2}')
for item in $tags
do
  if [[ $tag != "$prefix:$item" ]]; then
        docker rmi "$prefix:$item"
  fi
done

# start current image
docker run -d -p "3000:7001" --name $containerName --restart always "$tag"
