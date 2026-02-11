# 🤖 Backend Portfolio avec IA

Ce dossier contient le serveur Node.js qui gère :
1.  **L'Assistant IA (Chatbot)** : Utilise `node-nlp` pour comprendre et répondre aux questions.
2.  **Le Formulaire de Contact** : Envoie les emails via `nodemailer`.

## 🛠️ Installation

1.  Ouvrez un terminal dans ce dossier :
    ```bash
    cd portfolio-backend
    ```

2.  Installez les dépendances :
    ```bash
    npm install
    ```

## 🚀 Lancer le Serveur

Pour démarrer le backend (sur le port 3001) :

```bash
npm run dev
# ou
node server.js
```

## 🧠 Comment ça marche ?

-   **L'IA s'entraîne au démarrage** : À chaque lancement, le serveur "apprend" les phrases de `server.js`.
-   **API Chat** : `POST /api/chat` reçoit `{ message: "..." }` et renvoie `{ answer: "..." }`.
-   **Email** : `POST /api/contact` gère l'envoi d'emails.

## 📝 Configuration (.env)

Assurez-vous d'avoir un fichier `.env` avec :

```env
GMAIL_USER=votre_email@gmail.com
GMAIL_PASS=votre_mot_de_passe_app
EMAIL_TO=email_de_réception@gmail.com
PORT=3001
```
