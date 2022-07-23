echo "generate bundle"
npm run generate

ip="162.241.70.134"
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
