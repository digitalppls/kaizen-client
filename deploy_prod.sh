echo "build"
npm run generate

ip="188.68.218.157"
folder="/www/kaizen-client"

echo "packing"
tar czf kaizen.tar.gz dist/

echo "UPLOAD"
scp kaizen.tar.gz root@$ip:$folder


ssh -tt root@$ip << EOF
 cd $folder;
 tar -zxvf kaizen.tar.gz;
EOF

echo "CLEAR..."
rm kaizen.tar.gz
