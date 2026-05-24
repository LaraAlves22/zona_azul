BACKEND AWS
    IP publico 3.139.101.137:3000
    Rodar o frontend local na mesma API

Acessar EC2 via SSH - caso precise
    ssh -i ~/zona-azul-key.pem ubuntu@3.150.159.219

Subir no EC2
    cd ~/zona-azul-front-deploy && git fetch origin && git reset --hard origin/main && source ~/.bashrc && nvm use 22 && npm install && npm run build && rm -rf ~/zona-azul-api/public/* && cp -r dist/* ~/zona-azul-api/public/ && pm2 restart zona-azul-api
Rodar front 
    npm run dev -- --host 0.0.0.0

Atualizar 
    cd /root/zona-azul-front
    git add -A
    git commit -m "descricao da mudanca"
    git push