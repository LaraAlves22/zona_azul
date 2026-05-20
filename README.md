BACKEND AWS
    IP publico 3.139.101.137:3000
    Rodar o frontend local na mesma API

Acessar EC2 via SSH - caso precise
    ssh -i zona-azul-key.pem ubuntu@3.139.101.137

Rodar front 
    npm run dev -- --host 0.0.0.0

Atualizar 
    cd /root/zona-azul-front
    git add -A
    git commit -m "descricao da mudanca"
    git push