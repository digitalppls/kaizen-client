echo "build"
npm run generate

ip="207.154.226.241"
folder="/www/oromundo-client"

echo "packing"
tar czf oromundo.tar.gz dist/

echo "UPLOAD"
scp oromundo.tar.gz root@$ip:$folder


ssh -tt root@$ip << EOF
 cd $folder;
 tar -zxvf oromundo.tar.gz;
EOF



